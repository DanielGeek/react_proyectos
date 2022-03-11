import React from 'react';
import {
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from '@testing-library/react';

import { GithubSearchPage } from './github-serach-page';

const setup = () => render(<GithubSearchPage />);

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
	const fireClickSearch = () =>
		fireEvent.click(screen.getByRole('button', { name: /search/i }));

	it('the search button should be disabled until the search is done', async () => {
		setup();

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

		// eslint-disable-next-line jest/valid-expect
		expect(within(repository).getByRole('img', { name: /test/i }));

		expect(tableCells).toHaveLength(5);

		expect(repository).toHaveTextContent(/test/i);
		expect(stars).toHaveTextContent(/10/);
		expect(forks).toHaveTextContent(/5/);
		expect(openIssues).toHaveTextContent(/2/i);
		expect(updatedAt).toHaveTextContent(/2020-01-01/i);

		// eslint-disable-next-line testing-library/no-node-access
		expect(withinTable.getByText(/test/i).closest('a')).toHaveAttribute(
			'href',
			'http://localhost:3000/test'
		);
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

		const previousPageBtn = screen.getByRole('button', {name: /previous page/i});

		expect(previousPageBtn).toBeInTheDocument()

		expect(
			screen.getByRole('button', { name: /next page/i })
		).toBeInTheDocument();

		expect(previousPageBtn).toBeDisabled();
	});
});

describe('when the developer does a search without results', () => {
	it.todo('must show a empty state message')
})
