import Resumen from "../components/Resumen";


function Dashboard() {
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