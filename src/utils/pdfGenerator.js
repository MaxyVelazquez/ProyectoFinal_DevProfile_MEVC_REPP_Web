import { pdf } from "@react-pdf/renderer";
import { createElement } from "react";
import CurriculumPDF from "../hooks/CurriculumPDF";

export async function descargarPDF(contextValue) {
  const blob = await pdf(
    createElement(CurriculumPDF, {
      datosPersonales: contextValue.datosPersonales,
      enlaces: contextValue.enlaces,
      habilidades: contextValue.habilidades,
      proyectos: contextValue.proyectos,
      educacion: contextValue.educacion,
      experiencia: contextValue.experiencia,
      imagen: contextValue.imagen,
    })
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "curriculum.pdf";
  link.click();
  URL.revokeObjectURL(url);
}