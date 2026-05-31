import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container">

        <div className="info">
          <h1>Tu curriculum <br/>
          <span className="resaltar">impecable</span> en <br />
          minutos</h1>
          <p>Crea, edita y comparte tu curriculum profesional de una forma sencilla y sin complicaciones</p>  
        </div>

        <div className="panel">

        </div>   
      </div>

      <div className="containerBtnCurri">
        <button className="btnCrearCurri" onClick={() => navigate('/editor')}>Vamos a crear mi Curriculum</button>
      </div>
    </div>

  );
}

export default Home;