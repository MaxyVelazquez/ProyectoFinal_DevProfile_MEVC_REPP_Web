import SkillForm from "../components/SkillForm";
import SkillCard from "../components/SkillCard"
import { useNavigate } from "react-router-dom"
import PersonalForm from "../components/PersonalForm"




function Editor() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="titulo">Editor</h1>
      <p className="subtitulo">Rellene los campos con su informacion personal</p>
      <div>
        <PersonalForm/>
        <SkillForm/>
      </div>
      <div className="containerBtnVerPreview">
        <button className="btnVerPreview" onClick={() => navigate('/preview')}>Ver preview</button>
      </div>
    </div>
  )
}

export default Editor