import { useContext } from "react";
import { CVContext } from "../context/CVContext";

function CVPreview() {
  const {
    datosPersonales,
    enlaces,
    habilidades,
    proyectos,
    educacion,
    experiencia,
    imagen,
  } = useContext(CVContext);

  return (
    <div className="cv-wrapper" id="cv-preview">

      <aside className="cv-sidebar">

        <div className="cv-foto-container">
          {imagen
            ? <img src={imagen} alt="Foto de perfil" className="cv-foto" />
            : <div className="cv-foto-placeholder"></div>
          }
        </div>

        <div className="cv-identidad">
          <h1 className="cv-nombre">{datosPersonales.nombre || "Nombre"}</h1>
          <p className="cv-carrera">{datosPersonales.carrera || "Área de especialidad"}</p>
        </div>

        <div className="cv-divider" />

        <section className="cv-seccion-side">
          <h3 className="cv-seccion-titulo-side">Contacto</h3>
          {datosPersonales.ciudad && (
            <div className="cv-contacto-item">
              <span className="cv-icono">📍</span>
              <span>
                {datosPersonales.ciudad}
                {datosPersonales.estado ? `, ${datosPersonales.estado}` : ""}
                {datosPersonales.municipio ? `, ${datosPersonales.municipio}` : ""}
              </span>
            </div>
          )}
          {datosPersonales.correo && (
            <div className="cv-contacto-item">
              <span className="cv-icono">✉️</span>
              <span>{datosPersonales.correo}</span>
            </div>
          )}
          {datosPersonales.telefono && (
            <div className="cv-contacto-item">
              <span className="cv-icono">📞</span>
              <span>{datosPersonales.telefono}</span>
            </div>
          )}
        </section>

        {enlaces.length > 0 && enlaces.some(e => e.trim() !== "") && (
          <>
            <div className="cv-divider" />
            <section className="cv-seccion-side">
              <h3 className="cv-seccion-titulo-side">Enlaces</h3>
              {enlaces.filter(e => e.trim() !== "").map((enlace, i) => (
                <div className="cv-contacto-item" key={i}>
                  <span className="cv-icono">🔗</span>
                  <a href={enlace} target="_blank" rel="noreferrer" className="cv-enlace">
                    {enlace.replace(/https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              ))}
            </section>
          </>
        )}

        {habilidades.length > 0 && (
          <>
            <div className="cv-divider" />
            <section className="cv-seccion-side">
              <h3 className="cv-seccion-titulo-side">Habilidades</h3>
              {habilidades.map((h, i) => (
                <div className="cv-habilidad" key={i}>
                  <div className="cv-habilidad-header">
                    <span className="cv-habilidad-nombre">{h.nombre}</span>
                    <span className="cv-habilidad-nivel">{h.nivel}</span>
                  </div>
                  <div className="cv-habilidad-barra-bg">
                    <div
                      className="cv-habilidad-barra"
                      style={{
                        width: h.nivel === "Básico" ? "33%" : h.nivel === "Intermedio" ? "66%" : "100%"
                      }}
                    />
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

      </aside>

      <main className="cv-main">

        {/* Perfil */}
        {datosPersonales.descripcion && (
          <section className="cv-seccion">
            <h2 className="cv-seccion-titulo">Perfil Profesional</h2>
            <div className="cv-seccion-linea" />
            <p className="cv-descripcion">{datosPersonales.descripcion}</p>
          </section>
        )}

        {experiencia.length > 0 && (
          <section className="cv-seccion">
            <h2 className="cv-seccion-titulo">Experiencia</h2>
            <div className="cv-seccion-linea" />
            {experiencia.map((exp, i) => (
              <div className="cv-item" key={i}>
                <div className="cv-item-header">
                  <div>
                    <h4 className="cv-item-titulo">{exp.puesto}</h4>
                    <p className="cv-item-subtitulo">{exp.institucion}</p>
                  </div>
                  <span className="cv-item-fecha">{exp.periodo}</span>
                </div>
                {exp.descripcion && <p className="cv-item-desc">{exp.descripcion}</p>}
                {exp.tecnologias && exp.tecnologias.length > 0 && (
                  <div className="cv-techs">
                    {exp.tecnologias.map((t, j) => (
                      <span className="cv-tech-badge" key={j}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {educacion.length > 0 && (
          <section className="cv-seccion">
            <h2 className="cv-seccion-titulo">Formación</h2>
            <div className="cv-seccion-linea" />
            {educacion.map((edu, i) => (
              <div className="cv-item" key={i}>
                <div className="cv-item-header">
                  <div>
                    <h4 className="cv-item-titulo">{edu.nombre}</h4>
                    <p className="cv-item-subtitulo">{edu.institucion}</p>
                  </div>
                  <span className="cv-item-fecha">{edu.periodo}</span>
                </div>
                {edu.descripcion && <p className="cv-item-desc">{edu.descripcion}</p>}
                {edu.enlace && (
                  <a href={edu.enlace} target="_blank" rel="noreferrer" className="cv-enlace">
                    Ver evidencia →
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {proyectos.length > 0 && (
          <section className="cv-seccion">
            <h2 className="cv-seccion-titulo">Proyectos</h2>
            <div className="cv-seccion-linea" />
            <div className="cv-proyectos-grid">
              {proyectos.map((p, i) => (
                <div className="cv-proyecto" key={i}>
                  <h4 className="cv-item-titulo">{p.nombre}</h4>
                  {p.descripcion && <p className="cv-item-desc">{p.descripcion}</p>}
                  {p.tecnologias && p.tecnologias.length > 0 && (
                    <div className="cv-techs">
                      {p.tecnologias.map((t, j) => (
                        <span className="cv-tech-badge" key={j}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem' }}>
                    {p.repositorio && (
                      <a href={p.repositorio} target="_blank" rel="noreferrer" className="cv-enlace">
                        Repositorio →
                      </a>
                    )}
                    {p.deploy && (
                      <a href={p.deploy} target="_blank" rel="noreferrer" className="cv-enlace">
                        Demo →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default CVPreview;