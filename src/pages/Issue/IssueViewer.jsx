import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { useGesture } from "@use-gesture/react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function IssueViewer({ file }) {
  const documentRef = useRef(null);
  const viewerRef = useRef(null);

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        gsap.to(documentRef.current, { x, y });
      },
      onPinch: ({ offset: [scale, angle], origin: [x, y] }) => {
        gsap.to(documentRef.current, { scale });
      },
    },
    {
      target: documentRef,
      drag: {
        bounds: { left: 0, right: 0, top: 0, bottom: 0 },
        rubberband: 0.2,
      },
      eventOptions: { passive: false },
    }
  );

  return (
    <div
      ref={viewerRef}
      className="h-[30rem] flex flex-row justify-center items-center"
    >
      {/* <div className="absolute w-[1000px] h-[480px] border-2 border-red-500 border-solid z-50" /> */}
      <Document
        file={file}
        inputRef={documentRef}
        className="absolute touch-none flex flex-row"
      >
        <Page
          pageNumber={2}
          height={450}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
        <Page
          pageNumber={3}
          height={450}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
