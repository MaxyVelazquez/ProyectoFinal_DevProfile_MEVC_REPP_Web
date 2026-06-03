function ExperienceCard({ item, onEditar, onEliminar }) {
  return (
    <div className="experience-card">
      <h3>{item.puesto}</h3>
      <p><strong>Institución:</strong> {item.institucion}</p>
      <p><strong>Periodo:</strong> {item.periodo}</p>
      <p>{item.descripcion}</p>
      <div className="tech-list-card">
        {item.tecnologias.map((tech, index) => (
          <span key={index} className="tech-badge">{tech}</span>
        ))}
      </div>
      {(onEditar || onEliminar) && (
        <div className="experience-card-actions">
            {onEditar && (
                <button onClick={() => onEditar(item)}>Editar </button>
            )}
            {onEliminar && (
                <button onClick={() => onEliminar(item.id)}>Eliminar</button>
            )}
        </div>
      )}
    </div>
  );
}

export default ExperienceCard;