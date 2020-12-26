import React, { useContext, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { Proyecto } from "./Proyecto";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const ListadoProyectos = () => {
  // Extraer proyectos del state inicial del Context
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
  }, []);

  // revisar si proyectos tiene contenido
  if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition
            key={proyecto.id}
            timeout={200}
            classNames="proyecto"
          >
            <Proyecto
              proyecto={proyecto}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
