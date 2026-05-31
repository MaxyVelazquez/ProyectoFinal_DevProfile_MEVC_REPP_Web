import { createContext, useState, useEffect } from 'react'

export const CVContext = createContext()

function CVProvider({ children }) {

  const [datosPersonales, setDatosPersonales] = useState(() => {
    const guardado = localStorage.getItem('datosPersonales')
    return guardado ? JSON.parse(guardado) : {
      nombre: '',
      carrera: '',
      ciudad: '',
      correo: '',
      telefono: '',
      descripcion: '',
      imagen: ''
    }
  })

  const [enlaces, setEnlaces] = useState(() => {
    const guardado = localStorage.getItem('enlaces')
    return guardado ? JSON.parse(guardado) : []
  })

  const [habilidades, setHabilidades] = useState(() => {
    const guardado = localStorage.getItem('habilidades')
    return guardado ? JSON.parse(guardado) : []
  })

  const [proyectos, setProyectos] = useState(() => {
    const guardado = localStorage.getItem('proyectos')
    return guardado ? JSON.parse(guardado) : []
  })

  const [educacion, setEducacion] = useState(() => {
    const guardado = localStorage.getItem('educacion')
    return guardado ? JSON.parse(guardado) : []
  })

  const [experiencia, setExperiencia] = useState(() => {
    const guardado = localStorage.getItem('experiencia')
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem('datosPersonales', JSON.stringify(datosPersonales))
  }, [datosPersonales])

  useEffect(() => {
    localStorage.setItem('enlaces', JSON.stringify(enlaces))
  }, [enlaces])

  useEffect(() => {
    localStorage.setItem('habilidades', JSON.stringify(habilidades))
  }, [habilidades])

  useEffect(() => {
    localStorage.setItem('proyectos', JSON.stringify(proyectos))
  }, [proyectos])

  useEffect(() => {
    localStorage.setItem('educacion', JSON.stringify(educacion))
  }, [educacion])

  useEffect(() => {
    localStorage.setItem('experiencia', JSON.stringify(experiencia))
  }, [experiencia])

  return (
    <CVContext.Provider value={{
      datosPersonales, setDatosPersonales,
      enlaces, setEnlaces,
      habilidades, setHabilidades,
      proyectos, setProyectos,
      educacion, setEducacion,
      experiencia, setExperiencia
    }}>
      {children}
    </CVContext.Provider>
  )
}

export default CVProvider