import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import pdf from "./test.pdf";

function IssueViewer({ file }) {
  return (
    <TransformWrapper className="h-[30rem]">
      <TransformComponent>
        <Document file={file}>
          <Page pageNumber={1} height={480} renderAnnotationLayer={false} />
        </Document>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default function Issue() {
  return (
    <main>
      <IssueViewer file={pdf} />
    </main>
  );
}
