import Resumen from "../components/Resumen";
import Swal from "sweetalert2";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CVContext } from "../context/CVContext";

function Dashboard() {

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
    <div className="fondoNegro">
      <div className="dashboard-container">
        <h1 className="titulo">Panel de control</h1>
        <p className="subtitulo">Vea su resumen de perfil</p>
      </div>
      <div className="containerResumen">
        <Resumen/>
      </div>
    </div>
  )
}

export default Dashboard