import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalWorkerOptions, getDocument, version } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
GlobalWorkerOptions.workerSrc = `/pdfjs-dist/build/pdf.worker.js`;
import "../../../public/pdfjs-dist/web/viewer.css";

import { colors } from "estilos-lojas-cem";

const API = import.meta.env.PROD ? import.meta.env.VITE_PROSPECT_API_PROD : import.meta.env.VITE_PROSPECT_API;

export const VisualizerProspect = () => {
  //H const { changeTheme, theme } = UseAplication();
  let { codigo } = useParams();
  const [state, setState] = useState<number>(0);

  const find = async () => {
    const pdfContainer = document.getElementById("pdf-container");
    if (!pdfContainer) return;
    const pdfDocument = await getDocument(`${API}/${codigo}.pdf`).promise;
    // const pdfDocument = await getDocument(`http://192.168.28.3:50000/wms_aplications/PECA_PROSPECTO/${String(codigo)}.pdf`).promise;

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      pdfDocument.getPage(pageNumber).then((page) => {
        const canvas = document.createElement("canvas");
        const content = document.createElement("div");
        const title = document.createElement("p");

        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.2 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        content.style.marginTop = "10px";
        content.style.marginBottom = "5px";

        const renderContext: any = {
          canvasContext: context,
          viewport: viewport,
        };

        page.render(renderContext).promise;

        title.style.height = "30px";
        title.style.textAlign = "center";
        title.style.fontWeight = "600";

        title.innerHTML = `Página ${pageNumber} de ${pdfDocument.numPages}`;

        content.appendChild(title);
        content.appendChild(canvas);

        pdfContainer.appendChild(content);
      });
    }
  };

  useEffect(() => {
    if (state == 0) {
      setState(state + 1);
      find();
    }
  }, [state]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.neutral.light.s20,
      }}
    >
      <div
        style={{
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        id="pdf-container"
      ></div>
      {/* <MobilePDFReader url={`http://192.168.79.146:50000/55116056.pdf`} /> */}
      {/* {`http://192.168.28.3:50000/wms_aplications/PECA_PROSPECTO/${String(codigo)}.pdf`} */}
    </div>
  );
};
