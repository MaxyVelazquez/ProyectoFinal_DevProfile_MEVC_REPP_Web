import SkillForm from "../components/SkillForm";
import SkillCard from "../components/SkillCard"
import { useNavigate } from "react-router-dom"
import PersonalForm from "../components/PersonalForm"




function Editor() {
  const navigate = useNavigate();
  return (
    <div>
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