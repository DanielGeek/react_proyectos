import React, { Fragment, useState } from 'react';

export const useMoneda = (label, stateInicial, opciones) => {

    // State de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <label>{label}</label>
            <select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </select>
        </Fragment>
    );

    // Retornar state, interfaz y fn que modifica el state
    return [state, Seleccionar, actualizarState];
}
