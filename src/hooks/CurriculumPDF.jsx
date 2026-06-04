import {
  Document, Page, View, Text, Image, StyleSheet
} from "@react-pdf/renderer";

const NARANJA = "rgb(209, 118, 65)";
const OSCURO = "#1a1a2e";

const s = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    padding: 10,
  },

  // ── SIDEBAR ──
  sidebar: {
    width: 200,
    minHeight: "100%",
    backgroundColor: OSCURO,
    padding: 20,
    flexDirection: "column",
    gap: 0,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    border: `3px solid ${NARANJA}`,
    alignSelf: "center",
    marginBottom: 12,
  },
  fotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    border: `3px solid ${NARANJA}`,
    alignSelf: "center",
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  nombre: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 3,
  },
  carrera: {
    fontSize: 9,
    color: NARANJA,
    textAlign: "center",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 10,
  },
  seccionTituloSide: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: NARANJA,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  contactoItem: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 6,
  },
  contactoTexto: {
    fontSize: 8,
    color: "#cccccc",
    flex: 1,
  },
  enlaceTexto: {
    fontSize: 8,
    color: NARANJA,
    flex: 1,
  },
  habilidad: {
    marginBottom: 8,
  },
  habilidadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  habilidadNombre: {
    fontSize: 8,
    color: "#ffffff",
  },
  habilidadNivel: {
    fontSize: 7,
    color: "#aaaaaa",
  },
  barraBg: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
  },
  barraFill: {
    height: 3,
    backgroundColor: NARANJA,
    borderRadius: 2,
  },

  // ── MAIN ──
  main: {
    flex: 1,
    padding: 25,
    flexDirection: "column",
    gap: 0,
  },
  seccion: {
    marginBottom: 16,
  },
  seccionTitulo: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: OSCURO,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  seccionLinea: {
    height: 2,
    backgroundColor: NARANJA,
    marginBottom: 10,
    width: 40,
  },
  descripcion: {
    fontSize: 9,
    color: "#555555",
    lineHeight: 1.6,
  },
  item: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #f0f0f0",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitulo: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: OSCURO,
  },
  itemSubtitulo: {
    fontSize: 8,
    color: NARANJA,
  },
  itemFecha: {
    fontSize: 8,
    color: "#999999",
  },
  itemDesc: {
    fontSize: 8,
    color: "#666666",
    lineHeight: 1.5,
    marginTop: 3,
  },
  techs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  techBadge: {
    fontSize: 7,
    color: NARANJA,
    border: `1px solid ${NARANJA}`,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  proyectosGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
},
proyecto: {
  width: "48%",
  backgroundColor: "#f9f9f9",
  borderLeft: `3px solid ${NARANJA}`,
  padding: 8,
  marginBottom: 8,
  marginRight: "2%",
},
});

function NivelBarra({ nivel }) {
  const ancho = nivel === "Básico" ? "33%" : nivel === "Intermedio" ? "66%" : "100%";
  return (
    <View style={s.barraBg}>
      <View style={[s.barraFill, { width: ancho }]} />
    </View>
  );
}

function CurriculumPDF({ datosPersonales, enlaces, habilidades, proyectos, educacion, experiencia, imagen }){

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── SIDEBAR ── */}
        <View style={s.sidebar}>

          {imagen
            ? <Image src={imagen} style={s.foto} />
            : <View style={s.fotoPlaceholder} />
          }

          <Text style={s.nombre}>{datosPersonales.nombre || "Nombre"}</Text>
          <Text style={s.carrera}>{datosPersonales.carrera || "Área de especialidad"}</Text>

          <View style={s.divider} />

          {/* Contacto */}
          <Text style={s.seccionTituloSide}>Contacto</Text>
          {datosPersonales.ciudad && (
            <View style={s.contactoItem}>
              <Text style={s.contactoTexto}>
                {datosPersonales.ciudad}
                {datosPersonales.estado ? `, ${datosPersonales.estado}` : ""}
                {datosPersonales.municipio ? `, ${datosPersonales.municipio}` : ""}
              </Text>
            </View>
          )}
          {datosPersonales.correo && (
            <View style={s.contactoItem}>
              <Text style={s.contactoTexto}>{datosPersonales.correo}</Text>
            </View>
          )}
          {datosPersonales.telefono && (
            <View style={s.contactoItem}>
              <Text style={s.contactoTexto}>{datosPersonales.telefono}</Text>
            </View>
          )}

          {/* Enlaces */}
          {enlaces.some(e => e.trim() !== "") && (
            <>
              <View style={s.divider} />
              <Text style={s.seccionTituloSide}>Enlaces</Text>
              {enlaces.filter(e => e.trim() !== "").map((enlace, i) => (
                <View style={s.contactoItem} key={i}>
                  <Text style={s.enlaceTexto}>
                    {enlace.replace(/https?:\/\/(www\.)?/, "")}
                  </Text>
                </View>
              ))}
            </>
          )}

          {/* Habilidades */}
          {habilidades.length > 0 && (
            <>
              <View style={s.divider} />
              <Text style={s.seccionTituloSide}>Habilidades</Text>
              {habilidades.map((h, i) => (
                <View style={s.habilidad} key={i}>
                  <View style={s.habilidadHeader}>
                    <Text style={s.habilidadNombre}>{h.nombre}</Text>
                    <Text style={s.habilidadNivel}>{h.nivel}</Text>
                  </View>
                  <NivelBarra nivel={h.nivel} />
                </View>
              ))}
            </>
          )}

        </View>

        {/* ── MAIN ── */}
        <View style={s.main}>

          {datosPersonales.descripcion && (
            <View style={s.seccion}>
              <Text style={s.seccionTitulo}>Perfil Profesional</Text>
              <View style={s.seccionLinea} />
              <Text style={s.descripcion}>{datosPersonales.descripcion}</Text>
            </View>
          )}

          {experiencia.length > 0 && (
            <View style={s.seccion}>
              <Text style={s.seccionTitulo}>Experiencia</Text>
              <View style={s.seccionLinea} />
              {experiencia.map((exp, i) => (
                <View style={s.item} key={i}>
                  <View style={s.itemHeader}>
                    <View>
                      <Text style={s.itemTitulo}>{exp.puesto}</Text>
                      <Text style={s.itemSubtitulo}>{exp.institucion}</Text>
                    </View>
                    <Text style={s.itemFecha}>{exp.periodo}</Text>
                  </View>
                  {exp.descripcion && <Text style={s.itemDesc}>{exp.descripcion}</Text>}
                  {exp.tecnologias?.length > 0 && (
                    <View style={s.techs}>
                      {exp.tecnologias.map((t, j) => (
                        <Text style={s.techBadge} key={j}>{t}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {educacion.length > 0 && (
            <View style={s.seccion}>
              <Text style={s.seccionTitulo}>Formación</Text>
              <View style={s.seccionLinea} />
              {educacion.map((edu, i) => (
                <View style={s.item} key={i}>
                  <View style={s.itemHeader}>
                    <View>
                      <Text style={s.itemTitulo}>{edu.nombre}</Text>
                      <Text style={s.itemSubtitulo}>{edu.institucion}</Text>
                    </View>
                    <Text style={s.itemFecha}>{edu.periodo}</Text>
                  </View>
                  {edu.descripcion && <Text style={s.itemDesc}>{edu.descripcion}</Text>}
                </View>
              ))}
            </View>
          )}

          {proyectos.length > 0 && (
            <View style={s.seccion}>
              <Text style={s.seccionTitulo}>Proyectos</Text>
              <View style={s.seccionLinea} />
              <View style={s.proyectosGrid}>
  {proyectos.map((p, i) => (
    <View style={s.proyecto} key={i} wrap={false}>
      <Text style={s.itemTitulo}>{p.nombre}</Text>
      {p.descripcion && <Text style={s.itemDesc}>{p.descripcion}</Text>}
      {p.tecnologias?.length > 0 && (
        <View style={s.techs}>
          {p.tecnologias.map((t, j) => (
            <Text style={s.techBadge} key={j}>{t}</Text>
          ))}
        </View>
      )}
    </View>
  ))}
</View>
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
}

export default CurriculumPDF;