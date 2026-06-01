import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";
import ProjectCard from "./ProjectCard";

function ProjectForm(){
    const { proyectos, setProyectos } = useContext(CVContext);
    
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        tecnologias: [],
        repositorio: '',
        deploy: '',
        imagen: ''
    });

    const [nuevaTecnologia, setNuevaTecnologia] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [errores, setErrores] = useState({});
    const [mostrarRepo, setMostrarRepo] = useState(false)
    const [mostrarDeploy, setMostrarDeploy] = useState(false)

    function manejarCambio(e){
        setForm({...form, [e.target.name]: e.target.value});
        setErrores({...errores, [e.target.name]: ''});
    }

    function validar(){
        const nuevosErrores = {};

        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (form.nombre.trim().length < 3) {
            nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
        } else if (form.nombre.trim().length > 50) {
            nuevosErrores.nombre = "El nombre no puede tener más de 50 caracteres.";
        } else {
            const duplicado = proyectos.find(
            p => p.nombre.toLowerCase() === form.nombre.trim().toLowerCase() && p.id !== editandoId
            );
            if (duplicado) {
                nuevosErrores.nombre = "Ya existe un proyecto con ese nombre.";
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
            nuevosErrores.tecnologias ="Debe agregar al menos una tecnología.";
        }

        if (form.repositorio && !form.repositorio.startsWith('http')) {
            nuevosErrores.repositorio = "El enlace debe comenzar con http:// o https://";
        }

        if (form.deploy && !form.deploy.startsWith('http')) {
            nuevosErrores.deploy = "El enlace debe comenzar con http:// o https://";
        }

        return nuevosErrores;
    }

    function manejarImagen(e){
        const archivo=e.target.files[0]
        if(archivo){
            const url=URL.createObjectURL(archivo)
            setForm({...form, imagen: url});
        }
    }

    function agregarProyecto(){
        const erroresEncontrados=validar();
        if(Object.keys(erroresEncontrados).length>0){
            setErrores(erroresEncontrados);
            return;
        }
        if(editandoId!==null){
            const actualizados=proyectos.map(p=>
                p.id===editandoId ?{...form, id: editandoId} : p
            )
            setProyectos(actualizados);
            setEditandoId(null);
        } else {
            const nuevo={...form, id: Date.now()};
            setProyectos([...proyectos, nuevo]);
        }
        setForm({
            nombre: '',
            descripcion: '',
            tecnologias: [],
            repositorio: '',
            deploy: '',
            imagen: ''
        });
        setErrores({});
        setMostrarRepo(false);
        setMostrarDeploy(false);
        
    }

    function agregarTecnologia() {
        const tech = nuevaTecnologia.trim();

        if (!tech) {
            return;
        }

        if (form.tecnologias.includes(tech)) {
            setErrores({
                ...errores,
                tecnologias: "Esa tecnología ya fue agregada."
            });
            return;
        }

        setForm({
            ...form,
            tecnologias: [...form.tecnologias, tech]
        });

        setNuevaTecnologia('');

        setErrores({
            ...errores,
            tecnologias: ''
        });
    }

    function editarProyecto(proyecto){
        setForm({
            nombre: proyecto.nombre || '',
            descripcion: proyecto.descripcion || '',
            tecnologias: proyecto.tecnologias || '',
            repositorio: proyecto.repositorio || '',
            deploy: proyecto.deploy || '',
            imagen: proyecto.imagen || ''
        });
        setEditandoId(proyecto.id);
        setErrores({});
        setMostrarRepo(proyecto.repositorio ? true : false);
        setMostrarDeploy(proyecto.deploy ? true : false);
    }
    function eliminarTecnologia(tech){
        setForm({
            ...form,
            tecnologias: form.tecnologias.filter(
                t => t !== tech
            )
        });
    }

    function eliminarProyecto(id){
        setProyectos(proyectos.filter(p => p.id !== id));
        if(editandoId === id){

            setForm({
                nombre: '',
                descripcion: '',
                tecnologias: [],
                repositorio: '',
                deploy: '',
                imagen: ''
            });

            setEditandoId(null);
            setErrores({});
            setMostrarRepo(false);
            setMostrarDeploy(false);
        }
        
    }

    return(
        <>
            <div className="ProjectForm">
                <h2>{editandoId ? 'Editar' : 'Agregar'} Proyecto</h2>
                <input name="nombre" placeholder="Proyecto"id="nombre" value={form.nombre} onChange={manejarCambio} />
                {errores.nombre && <span className="error">{errores.nombre}</span>}
                <input name="descripcion" placeholder="Descripción"id="descripcion" value={form.descripcion} onChange={manejarCambio} />
                {errores.descripcion && <span className="error">{errores.descripcion}</span>}
               <div className="tech-input-container">
                    <input
                        placeholder="Tecnologias"
                        value={nuevaTecnologia}
                        onChange={(e) => setNuevaTecnologia(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                agregarTecnologia();
                            }
                        }}
                    />
                    <div className="tech-list">
                        {form.tecnologias.map((tech, index) => (
                            <div key={index} className="tech-tag">
                                <span>{tech}</span>

                                <button
                                    type="button"
                                    onClick={() => eliminarTecnologia(tech)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button"onClick={agregarTecnologia}>+</button>
                </div>
                {errores.tecnologias && <span className="error">{errores.tecnologias}</span>}
                <input type="file" accept=".png, .jpg, .jpeg" onChange={manejarImagen} />
                {form.imagen && <img src={form.imagen} alt="Imagen del proyecto" />}
                {form.repositorio ?(
                    <div className="enlace-card">
                        <span>{form.repositorio}</span>
                        <button type="button" onClick={() => setForm({ ...form, repositorio: '' })}>✕</button>
                    </div>
                ): mostrarRepo ?(
                    <>
                        <input name="repositorio" placeholder="URL del repositorio" value={form.repositorio} onChange={manejarCambio} />
                        {errores.repositorio && <span className="error">{errores.repositorio}</span>}
                    </>
                ): (
                    <button type="button" className="btn-agregar-enlace" onClick={() => setMostrarRepo(true)}>+ Repositorio</button>
                )}
                {form.deploy?(
                    <div className="enlace-card">
                        <span>{form.deploy}</span>
                        <button type="button" onClick={() => setForm({ ...form, deploy: '' })}>✕</button>
                    </div>
                ): mostrarDeploy?(
                    <>
                        <input name="deploy" placeholder="URL del deploy" value={form.deploy} onChange={manejarCambio} />
                        {errores.deploy && <span className="error">{errores.deploy}</span>}
                    </>
                ): (
                    <button type="button" className="btn-agregar-enlace" onClick={() => setMostrarDeploy(true)}>+ Deploy</button>
                )}
                <button type="button" onClick={agregarProyecto}>
                    {editandoId ? 'Actualizar' : 'Agregar'} Proyecto
                </button>
            </div>
            <div className="proyectos-list">
                {proyectos.map(p => (
                    <ProjectCard
                    key={p.id}
                    proyecto={p}
                    onEditar={editarProyecto}
                    onEliminar={eliminarProyecto}
                    />
                ))}
            </div>
        </>
    )
}

export default ProjectForm;
