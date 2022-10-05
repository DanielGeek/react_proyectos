import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant='h1' color='primary'>Hello World</Typography>
    </Layout>
  )
}

export default HomePage;
