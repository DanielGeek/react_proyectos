import React from 'react';
import { useSelect } from '../hooks/useSelect';
import styles from './Formulario.module.css';
import PropTypes from 'prop-types';

export const Formulario = ({ guardarCategoria }) => {

    const OPCIONES = [
        { value: 'general', label: 'General' },
        { value: 'business', label: 'Negocios' },
        { value: 'entertainment', label: 'Entretenimiento' },
        { value: 'health', label: 'Negocios' },
        { value: 'science', label: 'Ciencia' },
        { value: 'sports', label: 'Deportes' },
        { value: 'technology', label: 'Tecnología' },
    ]

    // utilizar custom hook para retornar un select personalizado y el state con el select que escoja
    const [categoria, SelectNoticias] = useSelect('general', OPCIONES);

    // submit del form, pasar categoria a app.js
    const buscarNoticias = e => {
        e.preventDefault();

        guardarCategoria(categoria);
    }

    return (
        <div className={`${styles.buscador} row`}>
            <div className="col s12 m8 offset-m2">
                <form
                    onSubmit={buscarNoticias}
                >
                    <h2 className={styles.heading}>Encuentra Noticias por Categorías</h2>

                    <SelectNoticias />
                    <div className="input-field col s12">
                        <input
                            type="submit"
                            className={`${styles['btn-block']} btn-large amber darken-2`}
                            value="Buscar"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

Formulario.propTypes = {
    guardarCategoria: PropTypes.func.isRequired
}
