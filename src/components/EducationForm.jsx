import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";
import EducationCard from "./EducationCard";

function EducationForm(){
    const {educacion,setEducacion} = useContext(CVContext);
    const [form, setForm]=useState({

        institucion: '',
        nombre: "",
        periodo:"",
        descripcion: "",
        enlace: ""
    });

    const [editandoId, setEditandoId] = useState(null);
    const [errores, setErrores] = useState({});
    const [mostrarLink, setMostrarLink] = useState(false);


    function manejarCambio(e){
        setForm({...form, [e.target.name]: e.target.value});
        setErrores({...errores, [e.target.name]: ''});
    }


    function validar(){
        const nuevosErrores = {};

        if (!form.institucion.trim()) {
            nuevosErrores.institucion = "La institución es obligatoria.";
        }

        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (form.nombre.trim().length < 3) {
            nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
        } else if (form.nombre.trim().length > 50) {
            nuevosErrores.nombre = "El nombre no puede tener más de 50 caracteres.";
        } else {
            const duplicado = educacion.find(
            e => e.nombre.toLowerCase() === form.nombre.trim().toLowerCase() && e.id !== editandoId
            );
            if (duplicado) {
                nuevosErrores.nombre = "Ya existe un registro con ese nombre.";
            }
        }

        if (!form.descripcion.trim()) {
            nuevosErrores.descripcion = "La descripción es obligatoria.";
        } else if (form.descripcion.trim().length < 3) {
            nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
        } else if (form.descripcion.trim().length > 150) {
            nuevosErrores.descripcion = "La descripción no puede tener más de 150 caracteres.";
        }

        
        

        if (form.enlace && !form.enlace.startsWith('http')) {
            nuevosErrores.enlace = "El enlace debe comenzar con http:// o https://";
        }

        

        return nuevosErrores;
    }

    function agregarEducacion(){
        const erroresEncontrados=validar();
        if(Object.keys(erroresEncontrados).length> 0){
            setErrores(erroresEncontrados);
            return;
        }
        if(editandoId!==null){
            const actualizados=educacion.map(p=>
                p.id===editandoId ?{...form, id: editandoId} : p
            )
            setEducacion(actualizados);
            setEditandoId(null);
        } else {
            const nuevo={...form, id: Date.now()};
            setEducacion([...educacion, nuevo]);
        }
        setForm({
            institucion: '',
            nombre: "",
            periodo:"",
            descripcion: "",
            enlace: ""
        });
        setErrores({});
        setMostrarLink(false);
    } 

    function editarEducacion(educacion){
        setForm({
            institucion: educacion.institucion || '',
            nombre: educacion.nombre || '',
            periodo: educacion.periodo || '',
            descripcion: educacion.descripcion || '',
            enlace: educacion.enlace || ''
        });
        setEditandoId(educacion.id);
        setErrores({});
        setMostrarLink(educacion.enlace ? true : false);
    }

    function eliminarEducacion(id){
        setEducacion(educacion.filter(p => p.id !== id));
        if(editandoId===id){
            setForm({
                institucion: '',
                nombre: '',
                periodo: '',
                descripcion: '',
                enlace: ''
            });
            setEditandoId(null);
            setErrores({});
            setMostrarLink(false);
        }
    }
    return(
        <>
            <div className="education-form">
                <h2>{editandoId ? 'Editar' : 'Agregar'} Educación</h2>

                <input name="institucion" placeholder="Institución" value={form.institucion} onChange={manejarCambio} />
                {errores.institucion && <span className="error">{errores.institucion}</span>}

                <input name="nombre" placeholder="Nombre del programa, curso o certificación" value={form.nombre} onChange={manejarCambio} />
                {errores.nombre && <span className="error">{errores.nombre}</span>}

                <input name="periodo" placeholder="Periodo o año (ej. 2022 - 2024)" value={form.periodo} onChange={manejarCambio} />
                {errores.periodo && <span className="error">{errores.periodo}</span>}

                <input name="descripcion" placeholder="Descripción breve" value={form.descripcion} onChange={manejarCambio} />
                {errores.descripcion && <span className="error">{errores.descripcion}</span>}

                {form.enlace ? (
                <div className="enlace-card">
                    <span>{form.enlace}</span>
                    <button type="button" onClick={() => setForm({ ...form, enlace: '' })}>✕</button>
                </div>
                ) : mostrarLink ? (
                <>
                    <input name="enlace" placeholder="URL de evidencia" value={form.enlace} onChange={manejarCambio} />
                    {errores.enlace && <span className="error">{errores.enlace}</span>}
                </>
                ) : (
                <button type="button" className="btn-agregar-enlace" onClick={() => setMostrarLink(true)}>+ Agregar enlace de evidencia</button>
                )}

                <button type="button" onClick={agregarEducacion}>
                {editandoId ? 'Actualizar' : 'Agregar'} Educación
                </button>
            </div>

            <div className="education-list">
                {educacion.map(e => (
                <EducationCard
                    key={e.id}
                    item={e}
                    onEditar={editarEducacion}
                    onEliminar={eliminarEducacion}
                />
                ))}
            </div>
        </>
    )


}


export default EducationForm;