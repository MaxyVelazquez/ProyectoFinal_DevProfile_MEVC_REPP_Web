import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";
import SkillCard from "./SkillCard";

function SkillForm(){
    const {habilidades, setHabilidades}=useContext(CVContext);

    const [form, setForma]=useState({
        nombre: "",
        categoria: "",
        nivel:"",
        descripcion: ""
    });
    const [editandoId, setEditandoId]=useState(null);
    const [errores, setErrores]=useState({});

    function manejarCambio(e){
        setForma({...form, [e.target.name]: e.target.value});
        setErrores({...errores, [e.target.name]: ""});
    }

    function validar(){
        const nuevosErrores={};
        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (form.nombre.trim().length < 3) {
            nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
        } else if (form.nombre.trim().length > 15) {
            nuevosErrores.nombre = "El nombre no puede tener más de 15 caracteres.";
        } else {
            const duplicado = habilidades.find(
                h => h.nombre.toLowerCase() === form.nombre.trim().toLowerCase() && h.id !== editandoId
            );
            if (duplicado) {
                nuevosErrores.nombre = "Ya existe una habilidad con ese nombre.";
            }
        }
        if (!form.categoria) {
            nuevosErrores.categoria = "Selecciona una categoría.";
        }
        if (!form.nivel) {
            nuevosErrores.nivel = "Selecciona un nivel.";
        }
        if (!form.descripcion.trim()) {
            nuevosErrores.descripcion = "La descripción es obligatoria.";
        } else if (form.descripcion.trim().length < 3) {
            nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
        } else if (form.descripcion.trim().length > 60) {
            nuevosErrores.descripcion = "La descripción no puede tener más de 60 caracteres.";
        }
        return nuevosErrores;
    }

    function agregarHabilidad(){
        const erroresEncontrados=validar();
        if(Object.keys(erroresEncontrados).length > 0){
            setErrores(erroresEncontrados);
            return;
        }

        if(editandoId !== null){
            const actualizadas=habilidades.map(h=>
                h.id===editandoId ?{ ...form, id: editandoId } : h
            )
            setHabilidades(actualizadas);
            setEditandoId(null);
        }else{
            const nueva={...form, id: Date.now()}
            setHabilidades([...habilidades, nueva]);
        }
        setForma({nombre: '', categoria: '', nivel: '', descripcion: ''})
        setErrores({});
    }

    function editarHabilidad(habilidad){
        setForma(habilidad);
        setEditandoId(habilidad.id);
        setErrores({});
    }

    function eliminarHabilidad(id){
        setHabilidades(habilidades.filter(h => h.id !== id));
    }

    return(
        <>  
            <div className="skill-form">
                <h2>{editandoId!==null ? "Editar Habilidad" : "Agregar Habilidad"}</h2>
                <input name="nombre" placeholder="Habilidad" value={form.nombre} onChange={manejarCambio}/>
                {errores.nombre && <span className="error">{errores.nombre}</span>}
                <select name="categoria" value={form.categoria} onChange={manejarCambio}>
                    <option value="">Selecciona una categoría</option>
                    <option value="Programación">Programación</option>
                    <option value="Bases de datos">Bases de datos</option>
                    <option value="Diseño web">Diseño web</option>
                    <option value="Idiomas">Idiomas</option>
                    <option value="Herramientas de desarrollo">Herramientas de desarrollo</option>
                    <option value="Habilidades blandas">Habilidades blandas</option>
                </select>
                {errores.categoria && <span className="error">{errores.categoria}</span>}

                <select name="nivel" value={form.nivel} onChange={manejarCambio}>
                    <option value="">Selecciona un nivel</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
                {errores.nivel && <span className="error">{errores.nivel}</span>}
                <input name="descripcion" placeholder="Descripcion" value={form.descripcion} onChange={manejarCambio} />
                {errores.descripcion && <span className="error">{errores.descripcion}</span>}

                <button type="button" onClick={agregarHabilidad}>
                    {editandoId !== null ? "Actualizar" : "Agregar"}
                </button>
                
            </div>
            <div className="skills-list">
                {habilidades.map(h => (
                    <SkillCard
                    key={h.id}
                    habilidad={h}
                    onEditar={editarHabilidad}
                    onEliminar={eliminarHabilidad}
                    />
                ))}
            </div>
        </>
    )
}

export default SkillForm;