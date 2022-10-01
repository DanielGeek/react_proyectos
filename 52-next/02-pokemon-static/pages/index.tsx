import { NextPage, GetStaticProps } from 'next'
import { Layout } from '../components/layouts';

const HomePage: NextPage = (props) => {

  console.log({props});

  return (
    <Layout title="Pokemons list">
      <ul>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  console.log('hello world');

  return {
    props: {
      name: 'Daniel'
    }
  }
}

export default HomePage;
