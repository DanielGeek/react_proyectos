import React from 'react';
import {
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { GithubSearchPage } from './github-serach-page';
import {
	makeFakeResponse,
	makeFakeRepo,
	getReposListBy,
	makeFakeError,
} from '../../__fixtures__/repos'
import { OK_STATUS, UNEXPECTED_STATUS, UNPROCESSABLE_STATUS } from '../../consts';

const fakeResponse = makeFakeResponse({ totalCount: 1 })

const fakeRepo = makeFakeRepo();

fakeResponse.items = [fakeRepo];

const server = setupServer(
	rest.get('/search/repositories', (req, res, ctx) =>
		res(ctx.status(OK_STATUS), ctx.json(fakeResponse)),
	),
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const setup = () => render(<GithubSearchPage />);

const fireClickSearch = () =>
	fireEvent.click(screen.getByRole('button', { name: /search/i }));

describe('When the GithubSearchPage is mounted', () => {
	it('must be display the title', () => {
		setup();

		expect(
			screen.getByRole('heading', { name: /github repositories list page/i })
		).toBeInTheDocument();
	});

	it('must be an input text with label "filter by" field', () => {
		setup();

		expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
	});

	it('must be a Search Button', () => {
		setup();

		expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
	});

	it('must be a initial message `Please provide a search option and click in the search button`.', () => {
		setup();
		expect(
			screen.getByText(
				/please provide a search option and click in the search button/i
			)
		).toBeInTheDocument();
	});
});

describe('When the developer does a search', () => {
	it('the search button should be disabled until the search is done', async () => {
		setup();

		expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled();

		fireEvent.change(screen.getByLabelText(/filter by/i), {
			target: { value: 'test' },
		})


		expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled();

		// click btn
		fireClickSearch();

		// expect disabled
		expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();

		// not disabled (finish) async
		await waitFor(() =>
			expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled()
		);
	});

	it('the data should be displayed as a sticky table', async () => {
		setup();

		fireClickSearch();

		await waitFor(() =>
			expect(
				screen.queryByText(
					/please provide a search option and click in the search button/i
				)
			).not.toBeInTheDocument()
		);

		expect(screen.getByRole('table')).toBeInTheDocument();
	});

	it('the table headers must contain: Repository, stars, forks, open, issues and updated at', async () => {
		setup();

		fireClickSearch();

		const table = await screen.findByRole('table');

		const tableHeaders = within(table).getAllByRole('columnheader');

		expect(tableHeaders).toHaveLength(5);

		const [repository, stars, forks, openIssues, updatedAt] = tableHeaders;

		expect(repository).toHaveTextContent(/repository/i);
		expect(stars).toHaveTextContent(/stars/i);
		expect(forks).toHaveTextContent(/forks/i);
		expect(openIssues).toHaveTextContent(/open issues/i);
		expect(updatedAt).toHaveTextContent(/updated at/i);
	});

	it('each table result must contain: name, stars, updated at, forks, open issues, it should have a link that opens is a new tab', async () => {
		setup();

		fireClickSearch();

		const table = await screen.findByRole('table');

		const withinTable = within(table);

		const tableCells = withinTable.getAllByRole('cell');

		const [repository, stars, forks, openIssues, updatedAt] = tableCells;

		const avatarImg = within(repository).getByRole('img', {
			name: fakeRepo.name,
		});
		// eslint-disable-next-line jest/valid-expect
		expect(avatarImg).toBeInTheDocument();

		expect(tableCells).toHaveLength(5);

		expect(repository).toHaveTextContent(fakeRepo.name);
		expect(stars).toHaveTextContent(fakeRepo.stargazers_count);
		expect(forks).toHaveTextContent(fakeRepo.forks_count);
		expect(openIssues).toHaveTextContent(fakeRepo.open_issues_count);

		// eslint-disable-next-line testing-library/no-node-access
		expect(withinTable.getByText(fakeRepo.name).closest('a')).toHaveAttribute(
			'href',
			fakeRepo.html_url
		);

		expect(avatarImg).toHaveAttribute('src', fakeRepo.owner.avatar_url);
	});

	it('must display the total results number of the search and the current number of results', async () => {
		setup();

		fireClickSearch();

		await screen.findByRole('table');

		expect(screen.getByText(/1-1 of 1/)).toBeInTheDocument();
	});

	it('results size per page select/combobox with the options: 30, 50, 100. The default is 30.', async () => {
		setup();

		fireClickSearch();

		await screen.findByRole('table');

		expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));

		const listbox = screen.getByRole('listbox', { name: /Rows per page/i });

		const options = within(listbox).getAllByRole('option');

		const [option30, option50, option100] = options;

		expect(option30).toHaveTextContent(/30/);
		expect(option50).toHaveTextContent(/50/);
		expect(option100).toHaveTextContent(/100/);
	});

	it('muest exists the next and previous pagination button', async () => {
		setup();

		fireClickSearch();

		await screen.findByRole('table');

		const previousPageBtn = screen.getByRole('button', {
			name: /previous page/i,
		});

		expect(previousPageBtn).toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: /next page/i })
		).toBeInTheDocument();

		expect(previousPageBtn).toBeDisabled();
	});
});

describe('when the developer does a search without results', () => {
	it('must show a empty state message "You search has no results"', async () => {
		setup();

		server.use(
			rest.get('/search/repositories', (req, res, ctx) =>
				res(
					ctx.status(200),
					ctx.json(makeFakeResponse({})),
				)
			)
		);

		fireClickSearch();

		await screen.findByText(/you search has no results/i);

		expect(screen.queryByRole('table')).not.toBeInTheDocument();
	});
});

describe('when the developer types on filter by and does a search', () => {
	it('must display the related repos', async () => {
		setup();
		const internalFakeResponse = makeFakeResponse()
		const REPO_NAME = 'laravel'

		const expectedRepo = getReposListBy({ name: REPO_NAME })[0]

		server.use(
			rest.get('/search/repositories', (req, res, ctx) =>
				res(
					ctx.status(OK_STATUS),
					ctx.json({
						...internalFakeResponse,
						items: getReposListBy({ name: req.url.searchParams.get('q') }),
					}),
				),
			),
		)

		fireEvent.change(screen.getByLabelText(/filter by/i), {
			target: { value: REPO_NAME },
		})

		fireClickSearch()

		const table = await screen.findByRole('table')

		expect(table).toBeInTheDocument()

		const withinTable = within(table)

		const tableCells = withinTable.getAllByRole('cell')

		const [repository] = tableCells

		expect(repository).toHaveTextContent(expectedRepo.name)
	})
})

describe('when there is an Unprocessable Entity from the backend', () => {
	it('must display an alert message error with the message from the service', async () => {
		setup();

		expect(screen.queryByText(/validation failed/i)).not.toBeInTheDocument()
		// config server return error
		server.use(
			rest.get('/search/repositories', (req, res, ctx) =>
				res(ctx.status(UNPROCESSABLE_STATUS), ctx.json(makeFakeError())),
			),
		)

		// click search
		fireClickSearch()

		// expect message
		expect(await screen.findByText(/validation failed/i)).toBeVisible()
	})
})

describe('when there is an unexpected error from the backend', () => {
	it('must display an alert message error with the message from the service', async () => {
		setup();

		expect(screen.queryByText(/unexpected error/i)).not.toBeInTheDocument()
		// config server return error
		server.use(
			rest.get('/search/repositories', (req, res, ctx) =>
				res(ctx.status(UNEXPECTED_STATUS), ctx.json(makeFakeError({ message: 'Unexpected Error' }))),
			),
		)

		// click search
		fireClickSearch()

		// expect message
		expect(await screen.findByText(/unexpected error/i)).toBeVisible()
	})
})
