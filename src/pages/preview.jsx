import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CVContext } from "../context/CVContext";
import CVPreview from "../components/CVPreview";
import { descargarPDF } from "../utils/pdfGenerator";

function Preview() {
  const navigate = useNavigate();
  const contextValue = useContext(CVContext);

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