import CVPreview from "../components/CVPreview";
import { descargarPDF } from "../utils/pdfGenerator";
import { useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();

  return (
    <div className="preview-page">
      <div className="preview-toolbar">
        <button className="preview-btn-back" onClick={() => navigate('/editor')}>
          ← Seguir editando
        </button>
        <button className="preview-btn-pdf" onClick={descargarPDF}>
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