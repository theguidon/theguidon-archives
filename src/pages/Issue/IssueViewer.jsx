import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { useGesture } from "@use-gesture/react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function IssueViewer({ file }) {
  const documentRef = useRef(null);

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        gsap.to(documentRef.current, { x, y });
      },
    },
    {
      target: documentRef,
    }
  );

  return (
    <div className="h-[30rem] flex flex-row justify-center items-center border-solid border-red-500 border-2">
      <Document
        file={file}
        inputRef={documentRef}
        className="absolute touch-none"
      >
        <Page pageNumber={1} height={450} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}
