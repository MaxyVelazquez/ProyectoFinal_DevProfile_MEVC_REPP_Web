import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";

function PersonalForm() {
  const { datosPersonales, setDatosPersonales, enlaces, setEnlaces, setPersonalGuardado } = useContext(CVContext);
  const [errores, setErrores]=useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales({ ...datosPersonales, [name]: value });
    setErrores({...errores, [name]: ""})
  };

  function validar(){
    const nuevosErrores={};

    if(!datosPersonales.nombre.trim()){
      nuevosErrores.nombre="El nombre es obligatorio";
    }else if(datosPersonales.nombre.trim().length<3){
      nuevosErrores.nombre="El nombre debe tener al menos 3 letras"
    }else if(datosPersonales.nombre.trim().length>50){
      nuevosErrores.nombre="El nombre no puede tener más de 50 letras"
    }

    if(!datosPersonales.carrera.trim()){
      nuevosErrores.carrera="La carrera es obligatoria";
    }else if(datosPersonales.carrera.trim().length<3){
      nuevosErrores.carrera="La carrera debe tener al menos 3 letras"
    }else if(datosPersonales.carrera.trim().length>50){
      nuevosErrores.carrera="La carrera no puede tener más de 50 letras"
    }

    if(!datosPersonales.pais.trim()){
      nuevosErrores.pais="El país es obligatorio";
    }

    if(!datosPersonales.estado.trim()){
      nuevosErrores.estado="El estado es obligatorio";
    }

    

    if(!datosPersonales.correo.trim()){
      nuevosErrores.correo="El correo es obligatorio";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosPersonales.correo.trim())){
      nuevosErrores.correo="El correo no es válido"
    }

    if (datosPersonales.telefono && !/^\d+$/.test(datosPersonales.telefono)) {
      nuevosErrores.telefono = "El teléfono solo puede contener números.";
    }
    if (!datosPersonales.descripcion.trim()) {
      nuevosErrores.descripcion = "El perfil profesional es obligatorio.";
    } else if (datosPersonales.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = "Debe tener al menos 10 caracteres.";
    } else if (datosPersonales.descripcion.trim().length > 300) {
      nuevosErrores.descripcion = "No puede tener más de 300 caracteres.";
    }

    enlaces.forEach((enlace, index) => {
      if (enlace && !enlace.startsWith('http')) {
        nuevosErrores[`enlace_${index}`] = "El enlace debe comenzar con http:// o https://";
      }
    });

    return nuevosErrores;
  }


  function guardar(){
    const erroresEncontrados=validar();
    if(Object.keys(erroresEncontrados).length>0){
      setErrores(erroresEncontrados);
      return;
    }
    setPersonalGuardado(true);
    setErrores({});
  }

  const agregarEnlace = () => {
    setEnlaces([...enlaces, ""]);
  };

  const handleEnlaceChange = (index, value) => {
    const nuevosEnlaces = [...enlaces];
    nuevosEnlaces[index] = value;
    setEnlaces(nuevosEnlaces);
    setErrores({...errores, [`enlace_${index}`]: ""});

  };

  return (
    <form className="form">

      <div className="formGrupo">
        <label>Nombre completo</label>
        <input type="text" name="nombre" value={datosPersonales.nombre} onChange={handleChange} />
        {errores.nombre&& <span className="error">{errores.nombre}</span>}
      </div>

      <div className="formGrupo">
        <label>Área de especialidad</label>
        <input type="text" name="carrera" value={datosPersonales.carrera} onChange={handleChange} />
        {errores.carrera&& <span className="error">{errores.carrera}</span>}
      </div>

      <div className="formGrupo">
        <label>País</label>
        <input type="text" name="pais" value={datosPersonales.pais} onChange={handleChange} />
        {errores.pais&& <span className="error">{errores.pais}</span>}
      </div>

      <div className="formGrupo">
        <label>Estado</label>
        <input type="text" name="estado" value={datosPersonales.estado} onChange={handleChange} />
        {errores.estado&& <span className="error">{errores.estado}</span>}
      </div>

      <div className="formGrupo">
        <label>Municipio</label>
        <input type="text" name="municipio" placeholder="Puedes dejar este campo vacío" value={datosPersonales.municipio} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>Correo electrónico</label>
        <input type="email" name="correo" value={datosPersonales.correo} onChange={handleChange} />
        {errores.correo&& <span className="error">{errores.correo}</span>}
      </div>

      <div className="formGrupo">
        <label>Teléfono</label>
        <input type="tel" name="telefono" placeholder="Puedes dejar este campo vacío" value={datosPersonales.telefono} onChange={handleChange} />
        {errores.telefono&& <span className="error">{errores.telefono}</span>}
      </div>

      <div className="formGrupo formFull">
        <label>Perfil profesional</label>
        <textarea name="descripcion" spellCheck="true" value={datosPersonales.descripcion} onChange={handleChange} />
        {errores.descripcion&& <span className="error">{errores.descripcion}</span>}
      </div>

      <div className="formGrupo formFull">
        <label>Enlaces profesionales</label>
        <div className="enlacesGrid">
          {enlaces.map((enlace, index) => (
            <div key={index}>
               <input
                  
                  type="url"
                  value={enlace}
                  placeholder="https://..."
                  onChange={(e) => handleEnlaceChange(index, e.target.value)}
                />
                {errores[`enlace_${index}`] && <span className="error">{errores[`enlace_${index}`]}</span>}
            </div>
           
            
          ))}
        </div>
        <button type="button" className="btnAgregarEnlace" onClick={agregarEnlace}>
          + Agregar enlace
        </button>
      </div>
      <div className="formGrupo formFull">
        <button type="button" onClick={guardar}>Guardar</button>
      </div>

    </form>
  );
}

export default PersonalForm;