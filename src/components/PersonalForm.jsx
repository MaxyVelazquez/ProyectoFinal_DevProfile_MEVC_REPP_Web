import { useContext } from "react";
import { CVContext } from "../context/CVContext";

function PersonalForm() {
  const { datosPersonales, setDatosPersonales, enlaces, setEnlaces } = useContext(CVContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales({ ...datosPersonales, [name]: value });
  };

  const agregarEnlace = () => {
    setEnlaces([...enlaces, ""]);
  };

  const handleEnlaceChange = (index, value) => {
    const nuevosEnlaces = [...enlaces];
    nuevosEnlaces[index] = value;
    setEnlaces(nuevosEnlaces);
  };

  return (
    <form className="form">

      <div className="formGrupo">
        <label>Nombre completo</label>
        <input type="text" name="nombre" value={datosPersonales.nombre} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>Área de especialidad</label>
        <input type="text" name="carrera" value={datosPersonales.carrera} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>País</label>
        <input type="text" name="ciudad" value={datosPersonales.ciudad} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>Estado</label>
        <input type="text" name="estado" value={datosPersonales.estado} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>Municipio</label>
        <input type="text" name="municipio" placeholder="Puedes dejar este campo vacío" value={datosPersonales.municipio} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>Correo electrónico</label>
        <input type="email" name="correo" value={datosPersonales.correo} onChange={handleChange} />
      </div>

      <div className="formGrupo">
        <label>Teléfono</label>
        <input type="tel" name="telefono" placeholder="Puedes dejar este campo vacío" value={datosPersonales.telefono} onChange={handleChange} />
      </div>

      <div className="formGrupo formFull">
        <label>Perfil profesional</label>
        <textarea name="descripcion" spellCheck="true" value={datosPersonales.descripcion} onChange={handleChange} />
      </div>

      <div className="formGrupo formFull">
        <label>Enlaces profesionales</label>
        <div className="enlacesGrid">
          {enlaces.map((enlace, index) => (
            <input
              key={index}
              type="url"
              value={enlace}
              placeholder="https://..."
              onChange={(e) => handleEnlaceChange(index, e.target.value)}
            />
          ))}
        </div>
        <button type="button" className="btnAgregarEnlace" onClick={agregarEnlace}>
          + Agregar enlace
        </button>
      </div>

    </form>
  );
}

export default PersonalForm;