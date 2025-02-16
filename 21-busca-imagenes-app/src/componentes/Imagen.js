import React from 'react';
import PropTypes from 'prop-types';

export const Imagen = ({ imagen }) => {

    // Extraer las variables
    const { largeImageURL, likes, previewURL, tags, views } = imagen;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-imag-top" />

                <div className="card-body">
                    <p className="card-text">{likes} Me Gusta</p>
                    <p className="card-text">{views} Vistas</p>
                </div>

                <div className="card-footer">
                    <a
                        href={largeImageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                    >Ver Imagen</a>
                </div>
            </div>
        </div>)
}

Imagen.propTypes = {
    imagen: PropTypes.object.isRequired
}