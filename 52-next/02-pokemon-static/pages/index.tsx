import { NextPage, GetStaticProps } from 'next'
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse } from '../interfaces';

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

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  console.log( data );

  return {
    props: {
      pokemons: data.results
    }
  }
}

export default HomePage;
