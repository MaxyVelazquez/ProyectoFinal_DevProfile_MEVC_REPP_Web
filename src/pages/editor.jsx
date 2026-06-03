import SkillForm from "../components/SkillForm";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import PersonalForm from "../components/PersonalForm"
import ProjectForm from "../components/ProjectForm"
import EducationForm from "../components/EducationForm";
import ExperienceForm from "../components/ExperienceForm";
import ImagenForm from "../components/ImagenForm";


const secciones = [
  { nombre: 'Personal', componente: <PersonalForm /> },
  { nombre: 'Imagen', componente: <ImagenForm /> },
  { nombre: 'Habilidades', componente: <SkillForm /> },
  { nombre: 'Proyectos', componente: <ProjectForm /> },
  { nombre: 'Educación', componente: <EducationForm /> },
  { nombre: 'Experiencia', componente: <ExperienceForm /> },
]


function Editor() {
  const navigate = useNavigate();
  const [indice, setIndice]=useState(0);

  function siguiente(){
    if(indice < secciones.length - 1)setIndice(indice+1);
  }

  function anterior(){
    if(indice>0)setIndice(indice-1);
  }
  return (

 
    <div className="fondoNegro">
      <div>
        <h1 className="titulo">Editor</h1>
        <p className="subtitulo">Rellene los campos con su informacion personal</p>
      </div>
      <div className="editor-container">

        <div className="editor-navbar">
          {secciones.map((seccion, i) => (
            <button
              key={i}
              className={i === indice ? 'editor-nav-btn active' : 'editor-nav-btn'}
              onClick={() => setIndice(i)}
            >
              {seccion.nombre}
            </button>
          ))}
        </div>

        <div className="editor-contenido">
          <button className="editor-flecha" onClick={anterior} disabled={indice === 0}>
            ←
          </button>

          <div className="editor-form">
            {secciones[indice].componente}
          </div>

          <button className="editor-flecha" onClick={siguiente} disabled={indice === secciones.length - 1}>
            →
          </button>
        </div>

      </div>
      <div className="containerBtnVerPreview">
        <button className="btnVerPreview" onClick={() => navigate('/preview')}>Ver preview</button>
      </div>
    </div>
  );
}

export default Editor;