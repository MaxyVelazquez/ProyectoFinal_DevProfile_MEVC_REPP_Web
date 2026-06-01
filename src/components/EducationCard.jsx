import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";


function EducationCard({ item, onEliminar, onEditar }) {
    return(
        <div className="education-card">
            <h3>{item.institucion}</h3>
            <p>{item.nombre}</p>
            <p>{item.periodo}</p>
            <p>{item.descripcion}</p>
            
            
            <p>{item.enlace && <a href={item.enlace} target="_blank" rel="noopener noreferrer">Evidencia</a>}</p>
            
            <div className="education-card-actions">
                <button onClick={() => onEditar(item)}>Editar</button>
                <button onClick={() => onEliminar(item.id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default EducationCard;