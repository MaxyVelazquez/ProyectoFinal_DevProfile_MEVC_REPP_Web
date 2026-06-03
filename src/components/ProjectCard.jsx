import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";
import ProjectForm from "./ProjectForm";

function ProjectCard({ proyecto, onEditar, onEliminar }) {
    
    return(
        <div className="Project-Card">
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
            <div className="tech-list-card">
                {proyecto.tecnologias.map((tech, index) => (
                    <span key={index} className="tech-badge">
                        {tech}
                    </span>
                ))}
            </div>
            
            <p>{proyecto.repositorio && <a href={proyecto.repositorio} target="_blank" rel="noopener noreferrer">Repositorio</a>}</p>
            <p>{proyecto.deploy && <a href={proyecto.deploy} target="_blank" rel="noopener noreferrer">Deploy</a>}</p>

            {proyecto.imagen && <img src={proyecto.imagen} alt={proyecto.nombre} />}
            {(onEditar || onEliminar) && (
                <div className="project-card-actions">
                    {onEditar && (
                        <button onClick={() => onEditar(proyecto)}>Editar </button>
                    )}
                    {onEliminar && (
                        <button onClick={() => onEliminar(proyecto.id)}>Eliminar</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProjectCard;