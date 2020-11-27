import React, { Component } from "react";
import { Grid, Row, PageHeader } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import BuscarPelicula from "./BuscarPelicula";
import PeliculasEncontradas from "./PeliculasEncontradas";
// import PeliculasEncontradas from "./PeliculasEncontradas";

export class Pelicula extends Component {
  state = {
    peliculas: [],
    estaCargando: false
  };

  // componentDidMount = () => {
  //   const json = localStorage.getItem("peliculas");
  //   const peliculas = JSON.parse(json);
  //   this.setState({ peliculas });
  // };

  // componentDidUpdate = () => {
  //   const peliculas = JSON.stringify(this.state.peliculas);
  //   localStorage.setItem("peliculas", peliculas);
  // };

  peliculaPorBuscar = async e => {
    const peliculaPorBuscar = e.target.elements.peliculaPorBuscar.value;
    e.preventDefault();
    const apiFetch = await fetch(
      `https://itunes.apple.com/search?term=${peliculaPorBuscar}&media=movie&country=MX`
    );

    this.setState({ estaCargando: true });

    const peliculas = await apiFetch.json();
    this.setState({ peliculas: peliculas.results, estaCargando: false });
  };

  render() {
    if (this.state.estaCargando) {
      return <Spinner />;
    }
    const { peliculas } = this.state;
    return (
      <Grid>
        <Row>
          <PageHeader>Lista de Películas</PageHeader>
          <BuscarPelicula peliculaPorBuscar={this.peliculaPorBuscar} />
        </Row>
        <Row>
          <br />
          <PeliculasEncontradas peliculas={peliculas} />
        </Row>
      </Grid>
    );
  }
}

export default Pelicula;
