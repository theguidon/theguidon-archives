import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import pdf from "./test.pdf";

export default function Issue() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Document file={pdf}>
        <Page pageNumber={1} width={400} renderAnnotationLayer={false} />
      </Document>
    </main>
  );
}
