import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";
import SkillForm from "./SkillForm";


function SkillCard({habilidad, onEditar, onEliminar}){
    return(
        <div className="skill-card">
            <h3>{habilidad.nombre}</h3>
            <p><strong>Categoría: </strong>{habilidad.categoria}</p>
            <p><strong>Nivel: </strong>{habilidad.nivel}</p>
            <p><strong>Descripción: </strong>{habilidad.descripcion}</p>
            <div>
                <button onClick={() => onEditar(habilidad)}>Editar</button>
                <button onClick={() => onEliminar(habilidad.id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default SkillCard