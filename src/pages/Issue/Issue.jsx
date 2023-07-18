import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import pdf from "./test.pdf";

export default function Issue() {
  return (
    <main>
      <Document file={pdf}>
        <Page pageNumber={1} width="100" />
      </Document>
    </main>
  );
}
