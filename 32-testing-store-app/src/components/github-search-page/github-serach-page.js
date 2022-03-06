import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export const GithubSearchPage = () => {
	const [isSearching, setIsSearching] = useState(false);
	const [isSearchApplied, setIsSearchApplied] = useState(false);

	const handleClick = async () => {
		setIsSearching(true);
		await Promise.resolve();
		setIsSearchApplied(true);
		setIsSearching(false);
	};

	const renderContent = () => isSearchApplied ? (
		<table>
			<thead>
				<tr>
					<th>Repository</th>
					<th>Starts</th>
					<th>forks</th>
					<th>Open issues</th>
					<th>Updated at</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Test</td>
					<td>10</td>
					<td>5</td>
					<td>2</td>
					<td>2020-01-01</td>
				</tr>
			</tbody>
		</table>
	) : (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			height={400}
		>
			<Typography>
				Please provide a search option and click in the search button
			</Typography>
		</Box>
	)

	return (
		<Container>
			<Typography variant='h3' component='h1'>
				Github repositories list page
			</Typography>

			<Grid container spacing={2} justifyContent='space-between'>
				<Grid item md={6} xs={12}>
					<TextField fullWidth label='Filter by' id='filterBy' />
				</Grid>

				<Grid item md={3} xs={12}>
					<Button
						disabled={isSearching}
						fullWidth
						color='primary'
						variant='contained'
						onClick={handleClick}
					>
						Search
					</Button>
				</Grid>
			</Grid>

			{renderContent()}
		</Container>
	);
};

export default GithubSearchPage;
