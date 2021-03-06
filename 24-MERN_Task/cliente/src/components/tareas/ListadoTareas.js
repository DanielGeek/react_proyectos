import React, { Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { Tarea } from "./Tarea";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const ListadoTareas = () => {
  // Extraer proyectos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  // Obtener las tareas del context de tarea
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;
  // console.log(proyecto[0])

  // Elimina un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual.id)
  }

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0
          ? (
            <li className="tarea">
              <p>No hay tareas</p>
            </li>
          ) :
          <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition
                key={tarea.id}
                timeout={200}
                classNames="tarea"
              >
                <Tarea
                  tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};
