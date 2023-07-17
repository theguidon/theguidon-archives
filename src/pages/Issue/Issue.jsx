import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import pdf from "./pdf/iscs.pdf";

export default function Issue() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div>
      <nav>
        <button onClick={goToPrevPage}>Prev</button>
        <button onClick={goToNextPage}>Next</button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      <div className=" flex flex-row ">
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} />
        </Document>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber + 1} renderTextLayer={false} />
        </Document>
      </div>
    </div>
  );
}
