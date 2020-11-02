import React from 'react';
import Formulario from './components/Formulario';

function App() {
  return (
    <>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="one-half column">
          <Formulario />
        </div>
        <div className="one-half column">
          2
        </div>
      </div>
    </>
  );
}

export default App;
