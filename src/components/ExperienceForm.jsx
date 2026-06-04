import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";
import ExperienceCard from "./ExperienceCard";

function ExperienceForm() {
  const { experiencia, setExperiencia } = useContext(CVContext);

  const [form, setForm] = useState({
    puesto: '',
    institucion: '',
    periodo: '',
    descripcion: '',
    tecnologias: []
  });

  const [nuevaTecnologia, setNuevaTecnologia] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});

  function manejarCambio(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  }

  function validar() {
    const nuevosErrores = {};

    if (!form.puesto.trim()) {
      nuevosErrores.puesto = "El puesto es obligatorio.";
    } else if (form.puesto.trim().length < 3) {
      nuevosErrores.puesto = "El puesto debe tener al menos 3 caracteres.";
    } else if (form.puesto.trim().length > 50) {
      nuevosErrores.puesto = "El puesto no puede tener más de 50 caracteres.";
    }

    if (!form.institucion.trim()) {
      nuevosErrores.institucion = "La institución es obligatoria.";
    } else if (form.institucion.trim().length < 3) {
      nuevosErrores.institucion = "La institución debe tener al menos 3 caracteres.";
    } else if (form.institucion.trim().length > 50) {
      nuevosErrores.institucion = "La institución no puede tener más de 50 caracteres.";
    }

    if (!form.periodo.trim()) {
      nuevosErrores.periodo = "El periodo es obligatorio.";
    }else{
      if(form.periodo.trim()){
            const regexPeriodo = /^[0-9\- ]+$/;
            if (!regexPeriodo.test(form.periodo)) {
                nuevosErrores.periodo = "El periodo solo puede contener números y guiones";
            }
        }
    }

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    } else if (form.descripcion.trim().length < 3) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
    } else if (form.descripcion.trim().length > 150) {
      nuevosErrores.descripcion = "La descripción no puede tener más de 150 caracteres.";
    }

    if (form.tecnologias.length === 0) {
      nuevosErrores.tecnologias = "Debe agregar al menos una tecnología.";
    }

    return nuevosErrores;
  }

  function agregarTecnologia() {
    const tech = nuevaTecnologia.trim();
    if (!tech) return;

    if (form.tecnologias.includes(tech)) {
      setErrores({ ...errores, tecnologias: "Esa tecnología ya fue agregada." });
      return;
    }

    setForm({ ...form, tecnologias: [...form.tecnologias, tech] });
    setNuevaTecnologia('');
    setErrores({ ...errores, tecnologias: '' });
  }

  function eliminarTecnologia(tech) {
    setForm({ ...form, tecnologias: form.tecnologias.filter(t => t !== tech) });
  }

  function agregarExperiencia() {
    const erroresEncontrados = validar();
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }

    if (editandoId !== null) {
      const actualizados = experiencia.map(e =>
        e.id === editandoId ? { ...form, id: editandoId } : e
      );
      setExperiencia(actualizados);
      setEditandoId(null);
    } else {
      const nuevo = { ...form, id: Date.now() };
      setExperiencia([...experiencia, nuevo]);
    }

    setForm({ puesto: '', institucion: '', periodo: '', descripcion: '', tecnologias: [] });
    setErrores({});
  }

  function editarExperiencia(item) {
    setForm({
      puesto: item.puesto || '',
      institucion: item.institucion || '',
      periodo: item.periodo || '',
      descripcion: item.descripcion || '',
      tecnologias: item.tecnologias || []
    });
    setEditandoId(item.id);
    setErrores({});
  }

  function eliminarExperiencia(id) {
    setExperiencia(experiencia.filter(e => e.id !== id));
    if (editandoId === id) {
      setForm({ puesto: '', institucion: '', periodo: '', descripcion: '', tecnologias: [] });
      setEditandoId(null);
      setErrores({});
    }
  }

  return (
    <>
      <div className="experience-form">
        <h2>{editandoId ? 'Editar' : 'Agregar'} Experiencia</h2>

        <input name="puesto" placeholder="Nombre del puesto o actividad" value={form.puesto} onChange={manejarCambio} />
        {errores.puesto && <span className="error">{errores.puesto}</span>}

        <input name="institucion" placeholder="Institución, empresa o proyecto" value={form.institucion} onChange={manejarCambio} />
        {errores.institucion && <span className="error">{errores.institucion}</span>}

        <input name="periodo" placeholder="Periodo (ej. 2023 - 2024)" value={form.periodo} onChange={manejarCambio} />
        {errores.periodo && <span className="error">{errores.periodo}</span>}

        <input name="descripcion" placeholder="Descripción de actividades realizadas" value={form.descripcion} onChange={manejarCambio} />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}

        <div className="tech-input-container">
          <input
            placeholder="Tecnologías aplicadas"
            value={nuevaTecnologia}
            onChange={(e) => setNuevaTecnologia(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                agregarTecnologia();
              }
            }}
          />
          <button type="button" onClick={agregarTecnologia}>+</button>
        </div>
        <div className="tech-list">
          {form.tecnologias.map((tech, index) => (
            <div key={index} className="tech-tag">
              <span>{tech}</span>
              <button type="button" onClick={() => eliminarTecnologia(tech)}>✕</button>
            </div>
          ))}
        </div>
        {errores.tecnologias && <span className="error">{errores.tecnologias}</span>}

        <button type="button" onClick={agregarExperiencia}>
          {editandoId ? 'Actualizar' : 'Agregar'} Experiencia
        </button>
      </div>

      <div className="experience-list">
        {experiencia.map(e => (
          <ExperienceCard
            key={e.id}
            item={e}
            onEditar={editarExperiencia}
            onEliminar={eliminarExperiencia}
          />
        ))}
      </div>
    </>
  );
}

export default ExperienceForm;