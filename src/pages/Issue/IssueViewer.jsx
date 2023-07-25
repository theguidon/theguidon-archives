import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import arrowLeft from "../../assets/icons/arrow-left.svg";

gsap.registerPlugin(Draggable);

export default function IssueViewer({ file }) {
  const viewerRef = useRef(null);
  const documentRef = useRef(null);
  const scrollRef = useRef(null);
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [numPages, setNumPages] = useState(0);

  // document gestures
  Draggable.create(documentRef.current, {
    type: "x,y",
    bounds: viewerRef.current,
  });

  function handleScrollThumb(x) {
    const scrollWidth = scrollRef.current.getBoundingClientRect().width - 1;
    const xPos = gsap.utils.snap(scrollWidth / numPages - 1, x);
    gsap.set(thumbRef.current, { x: xPos });
    gsap.set(trackRef.current, { width: xPos + 20 });
  }

  // scroller gestures
  Draggable.create(thumbRef.current, {
    type: "x",
    bounds: scrollRef.current,
    liveSnap: (value) => {
      const scrollBounds = scrollRef.current.getBoundingClientRect();
      const scrollIncrement = scrollBounds.width / (numPages / 2);
      return Math.round(value / scrollIncrement) * scrollIncrement;
    },
    onDrag: () => {
      gsap.set(trackRef.current, {
        right:
          scrollRef.current.getBoundingClientRect().right -
          thumbRef.current.getBoundingClientRect().right,
      });
    },
  });

  //   useEffect(() => {
  //     const scrollWidth = scrollRef.current.getBoundingClientRect().width - 1;
  //     const pageScale = scrollWidth / numPages - 1;
  //     handleScrollThumb(pageNumber * pageScale);
  //   }, [pageNumber]);

  return (
    <div>
      <div
        ref={viewerRef}
        className="h-[45rem] flex flex-row justify-center items-center"
      >
        <div className="w-full flex flex-row justify-between items-center m-10">
          <button
            onClick={() => setPageNumber(pageNumber - 2)}
            disabled={pageNumber <= 0}
            className="w-8 z-50"
          >
            <img src={arrowLeft} alt="" />
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 2)}
            disabled={pageNumber >= numPages}
            className="w-8 z-50 -scale-x-100"
          >
            <img src={arrowLeft} alt="" />
          </button>
        </div>
        <Document
          file={file}
          renderMode="svg"
          inputRef={documentRef}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="absolute touch-none flex flex-row"
        >
          {pageNumber <= 0 ? null : (
            <Page
              pageNumber={pageNumber}
              height={700}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )}
          {pageNumber >= numPages ? null : (
            <Page
              pageNumber={pageNumber + 1}
              height={700}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )}
        </Document>
      </div>
      <div className="w-full h-24 bg-[#DBE9F4] flex flex-row font-chivo text-[#666] items-center justify-center gap-x-5">
        <div
          ref={scrollRef}
          className="w-[70rem] h-4 rounded-[0.675rem] border-[#B6C2CD] border-[1px] bg-white relative"
        >
          <div
            ref={trackRef}
            className="absolute inset-0 right-auto bg-guidon rounded-[inherit]"
          />
          <div
            ref={thumbRef}
            className="absolute top-1/2 -translate-y-1/2 rounded-full w-5 aspect-square border-[#6A757C] border-[1px] bg-[#E9EEF2] cursor-pointer touch-none"
          />
        </div>
        <p>{`Page${pageNumber > 0 && pageNumber < numPages ? "s" : ""} ${
          pageNumber > 0 ? pageNumber : ""
        }${pageNumber > 0 && pageNumber < numPages ? "-" : ""}${
          pageNumber + 1 < numPages ? pageNumber + 1 : ""
        } of ${numPages}`}</p>
      </div>
    </div>
  );
}
