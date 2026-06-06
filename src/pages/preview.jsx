import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CVContext } from "../context/CVContext";
import CVPreview from "../components/CVPreview";
import { descargarPDF } from "../utils/pdfGenerator";
import Swal from "sweetalert2";

function Preview() {
  const navigate = useNavigate();
  const contextValue = useContext(CVContext);
  const {datosPersonales, } = contextValue;

  useEffect(() => {
    const camposFaltantes = [];

    if (!datosPersonales.nombre?.trim()) camposFaltantes.push(1);
    if (!datosPersonales.carrera?.trim()) camposFaltantes.push(1);
    if (!datosPersonales.pais?.trim()) camposFaltantes.push(1);
    if (!datosPersonales.estado?.trim()) camposFaltantes.push(1);
    if (!datosPersonales.correo?.trim()) camposFaltantes.push(1);
    if (!datosPersonales.descripcion?.trim()) camposFaltantes.push(1);

    if (camposFaltantes.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        html: `Hay informacion incompleta, favor de completar`,
        confirmButtonText: "Seguir editando",
        confirmButtonColor: "rgba(182, 0, 0, 1)",
      }).then(() => navigate("/editor"));
    }
  }, []);

  return (
    <div className="preview-page">
      <div className="preview-toolbar">
        <button className="preview-btn-back" onClick={() => navigate('/editor')}>
          ← Seguir editando
        </button>
        <button className="preview-btn-pdf" onClick={() => descargarPDF(contextValue)}>
          ⬇ Exportar PDF
        </button>
      </div>
      <div className="preview-container">
        <CVPreview />
      </div>
    </div>
  );
}

export default Preview;