import React, { useState } from 'react'
import { useSocket } from '../hooks/useSocket';

export const BandAdd = () => {

  const [ valor, setValor ] = useState('');
  const { socket } = useSocket('http://localhost:8080');

  const onSubmit =(ev) => {
    ev.preventDefault();

    if( valor.trim().length > 0 ) {
      socket.emit('nueva-manda', {nombre: valor});
      setValor('');
    }
  }

  return (
    <>
    <h3>Agregar Banda</h3>
     <form onSubmit={ onSubmit }>
       <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={ valor }
          onChange={ (ev) => setValor( ev.target.value ) }
       />
     </form>
    </>
  )
}
