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

    zIndexBoost: false,
  });

  // scroller gestures
  const thumbDrag = Draggable.create(thumbRef.current, {
    type: "left",
    bounds: scrollRef.current,
    onDragEnd: function () {
      handleThumb();
      handleTrack();
    },
    onDrag: handleTrack,
  });

  function handleThumb(page) {
    const thumbBounds = thumbRef.current.getBoundingClientRect();
    const scrollBounds = scrollRef.current.getBoundingClientRect();
    const left =
      page == null
        ? gsap.utils.snap(
            1 / (numPages / 2),
            (thumbBounds.left - scrollBounds.left) / scrollBounds.width
          )
        : page / numPages;
    page ??= Math.round(numPages * left);
    setPageNumber(page);

    gsap.set(thumbRef.current, {
      left: `calc(${left * 100}% - ${thumbBounds.width / 2}px)`,
    });
    handleTrack();
  }

  function handleTrack() {
    gsap.set(trackRef.current, {
      right:
        scrollRef.current.getBoundingClientRect().right -
        thumbRef.current.getBoundingClientRect().right,
    });
  }

  return (
    <div>
      <div
        ref={viewerRef}
        className="h-[45rem] flex flex-row justify-center items-center"
      >
        <div className="w-full flex flex-row justify-between items-center m-10">
          <button
            onClick={function () {
              handleThumb(pageNumber - 2);
            }}
            disabled={pageNumber <= 0}
            className="w-8 z-50"
          >
            <img src={arrowLeft} alt="" />
          </button>
          <button
            onClick={function () {
              handleThumb(pageNumber + 2);
            }}
            disabled={pageNumber >= numPages}
            className="w-8 z-50 -scale-x-100"
          >
            <img src={arrowLeft} alt="" />
          </button>
        </div>
        <Document
          file={file}
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
