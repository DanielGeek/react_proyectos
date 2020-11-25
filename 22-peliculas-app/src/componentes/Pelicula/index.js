import React, { Component } from "react";
import { Grid, Row, PageHeader } from "react-bootstrap";
import BuscarPelicula from "./BuscarPelicula";
// import PeliculasEncontradas from "./PeliculasEncontradas";

export class Pelicula extends Component {
  state = {
    peliculas: []
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
    const api_fetch = await fetch(
      `https://itunes.apple.com/search?term=${peliculaPorBuscar}&media=movie&country=MX`
    );

    // this.setState({ estaCargando: true });

    const peliculas = await api_fetch.json();
    this.setState({ peliculas: peliculas.results });
    console.log(this.state.peliculas[0].longDescription);
  };

  render() {
    // if (this.state.estaCargando) {
    //   return <p>Cargando...</p>;
    // }

    return (
      <Grid>
        <Row>
          <PageHeader>Lista de Películas</PageHeader>
          <BuscarPelicula peliculaPorBuscar={this.peliculaPorBuscar} />
          {this.state.peliculas.map(pelicula => {
            return <p key={pelicula.trackId}>{pelicula.trackName}</p>;
          })}
        </Row>
        {/* <Row>
          <br />
          <PeliculasEncontradas peliculas={this.state.peliculas} />
        </Row> */}
      </Grid>
    );
  }
}

export default Pelicula;
