import { createContext, useState } from "react";

export const CVContext=createContext();

function CVProvider({children}){
    const [datosPersonales, setDatosPersonales] = useState({
        nombre: '',
        carrera: '',
        ciudad: '',
        correo: '',
        telefono: '',
        descripcion: '',
        image: ''
    });

    const [enlaces, setEnlaces]=useState([]);
    const [habilidades, setHabilidades]=useState([]);
    const [proyectos, setProyectos]=useState([]);
    const [educacion, setEducacion]=useState([]);
    const [experiencia, setExperiencia]=useState([]);

    return(
        <CVContext.Provider value={{
            datosPersonales,
            setDatosPersonales,
            enlaces,
            setEnlaces,
            habilidades,
            setHabilidades,
            proyectos,
            setProyectos,
            educacion,
            setEducacion,
            experiencia,
            setExperiencia
        }}>
            {children}
        </CVContext.Provider>   
    )



}

export default CVProvider;