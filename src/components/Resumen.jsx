import { useContext} from "react";
import { CVContext } from "../context/CVContext";
import SkillChart from "./SkillChart";
import SkillCard from "./SkillCard";
import ProjectCard from "./ProjectCard";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";

function Resumen(){
    const {
        datosPersonales,
        
        habilidades,
        proyectos,
        educacion,
        experiencia,
        
    } = useContext(CVContext);
    return(
        <>
            <div className="personal">
                <h1>{datosPersonales.nombre}</h1>
                <p>{datosPersonales.carrera}</p>
                <p>{datosPersonales.descripcion}</p>
                <p>{datosPersonales.correo}</p>
            </div>
            <div className="hero-cards">
                <div className="skills-list">
                    {habilidades.map(h => (
                        <SkillCard
                        key={h.id}
                        habilidad={h}
                        
                        />
                    ))}
                </div>
                <div className="proyectos-list">
                    {proyectos.map(p => (
                        <ProjectCard
                        key={p.id}
                        proyecto={p}
                        
                        />
                    ))}
                </div>
                <div className="experience-list">
                    {experiencia.map(e => (
                    <ExperienceCard
                        key={e.id}
                        item={e}
                        
                    />
                    ))}
                </div>
                <div className="education-list">
                    {educacion.map(e => (
                    <EducationCard
                        key={e.id}
                        item={e}
                        
                    />
                    ))}
                </div>
                
            </div>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <SkillChart/>
                </div>
            </div>
            
        </>
    )
}

export default Resumen;