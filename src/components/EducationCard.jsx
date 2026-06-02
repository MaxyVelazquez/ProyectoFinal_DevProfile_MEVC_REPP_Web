
function EducationCard({ item, onEliminar, onEditar }) {
    return(
        <div className="education-card">
            <h3>{item.institucion}</h3>
            <p>{item.nombre}</p>
            <p>{item.periodo}</p>
            <p>{item.descripcion}</p>
            
            
            <p>{item.enlace && <a href={item.enlace} target="_blank" rel="noopener noreferrer">Evidencia</a>}</p>
            
            {(onEditar || onEliminar) && (
                <div className="education-card-actions">
                    {onEditar && (
                        <button onClick={() => onEditar(item)}>Editar </button>
                    )}
                    {onEliminar && (
                        <button onClick={() => onEliminar(item.id)}>Eliminar</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default EducationCard;