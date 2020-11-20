import React, { useEffect, useState } from 'react';
import { Formulario } from './componentes/Formulario';
import { ListadoImagenes } from './componentes/ListadoImagenes';

function App() {

  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  console.log(paginaactual, totalpaginas, guardarPaginaActual)

  useEffect(() => {
    // para que no se ejecute la primera vez que cargue
    const consultarAPI = async () => {

      if (busqueda === '') return;

      const encodeBusqueda = encodeURI(busqueda);

      const imagenesPorPagina = 30;
      const key = '7266055-828ec0333b465c750bdc5c8c9';
      const url = `https://pixabay.com/api/?key=${key}&q=${encodeBusqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const { hits, totalHits } = resultado;

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);
      guardarImagenes(hits);
    }
    consultarAPI();
  }, [busqueda])

  // definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

        <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >&laquo; Anterior
        </button>

        <button
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
        >Siguiente &raquo;
        </button>
      </div>
    </div>
  );
}

export default App;
