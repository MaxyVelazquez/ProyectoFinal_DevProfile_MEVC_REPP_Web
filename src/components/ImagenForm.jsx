import { useState, useContext } from "react";
import { CVContext } from "../context/CVContext";

function ImagenForm() {
  const { imagen, setImagen } = useContext(CVContext);
  const [error, setError] = useState("");

  function manejarCambio(e) {
    const archivo = e.target.files[0];

    if (!archivo) return;

    const tiposValidos = ["image/jpeg", "image/png", "image/webp"];
    if (!tiposValidos.includes(archivo.type)) {
      setError("Solo se permiten imágenes JPG, PNG o WEBP.");
      return;
    }

    setError("");

    const url = URL.createObjectURL(archivo);
    setImagen(url);
  }

  return (
    <div className="imagen-form">
      <h2>Foto de perfil</h2>
      <div className="imagen-preview-container">
        {imagen
          ? <img src={imagen} alt="Preview" className="imagen-preview" />
          : <div className="imagen-placeholder">Sin imagen</div>
        }
      </div>
      <p className="imagen-estado">
        {imagen ? "Imagen cargada — puedes cambiarla:" : "Selecciona una imagen:"}
      </p>
      <input type="file" accept="image/jpeg, image/png, image/webp" onChange={manejarCambio} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default ImagenForm;