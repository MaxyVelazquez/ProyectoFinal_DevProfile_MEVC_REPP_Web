import maxyVelazquez from '../assets/imagenes/maxyVelazquez.jpeg';
import reyPicazo from '../assets/imagenes/reyPicazo.jpeg';

function About() {
  return (
    <div className="about">
      <div>
        <h1 className="titulo">Acerca de nosotros</h1>
        <p className="subtitulo">¿Quiénes somos?</p>
      </div>
      <div className="descripcion">
        <h4>DevProfile es una herramienta diseñada para ayudarte a crear y gestionar tu currículum vitae de manera profesional y eficiente.</h4>
        <hr />
      </div>
      <div className="cards">
        <div className="card">
          <h6>Objetivo</h6>
          <p>Ayudar a los usuarios a crear y gestionar su currículum vitae de manera profesional y eficiente.</p>
        </div>
        <div className="card">
          <h6>Visión</h6>
          <p>Ser la plataforma líder en creación y gestión de currículum vitae, reconocida por su facilidad de uso, personalización y calidad profesional.</p>
        </div>
        <div className="card">
          <h6>Misión</h6>
          <p>Proporcionar a los usuarios una herramienta intuitiva y accesible para crear currículum vitae profesionales que les permitan destacar en el mercado laboral.</p>
        </div>
        <div className="card">
          <h6>Valores</h6>
          <p>Innovación, calidad, accesibilidad, personalización, satisfacción del cliente.</p>
        </div>
        <div className="card">
          <h6>Privacidad</h6>
          <p>Nos comprometemos a proteger la privacidad de nuestros usuarios y garantizar la seguridad de sus datos personales.</p>
        </div>
        <div className="card">
          <h6>Contacto</h6>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos: rincontesoros@gmail.com</p>
        </div>
      </div>
      <div className="containerImgEquipo">
        <div>
          <h2>Nuestro Equipo</h2>
        </div>
        <div className="equipo">
          <div className="miembro">
            <img src={reyPicazo} alt="reyPicazo.jpeg" />
            <p>Rey Picazo</p>
            <span>Cazador de duendes</span>
          </div>
          <div className="miembro">
            <img src={maxyVelazquez} alt="maxyVelazquez.jpeg" />
            <p>Maxy Velazquez</p>
            <span>Tocador de mujeres</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;