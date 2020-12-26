import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

export const FormTarea = () => {

  // Extraer proyectos del state activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  const onSubmit = e => {
    e.preventDefault();

    // validar

    // pasar la vadicación

    // agregar la nueva tarea al state de tareas

    // reinicar el form

  }

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Agregar Tarea"
          />
        </div>
      </form>
    </div>
  );
};
