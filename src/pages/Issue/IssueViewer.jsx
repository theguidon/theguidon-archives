import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowLeft2 from "../../assets/icons/arrow-left-2.svg";
import twoPages from "../../assets/icons/two-pages.svg";
import onePage from "../../assets/icons/one-page.svg";
import zoomIn from "../../assets/icons/zoom-in.svg";
import zoomOut from "../../assets/icons/zoom-out.svg";
import fullscreen from "../../assets/icons/fullscreen.svg";
import image from "../../assets/images/freshmanual.png";

gsap.registerPlugin(Draggable);

export default function IssueViewer({ file }) {
  const viewerRef = useRef(null);
  const documentRef = useRef(null);

  const scrollRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const zoomRef = useRef(null);
  const zoomThumbRef = useRef(null);
  const zoomTrackRef = useRef(null);

  const [pageNumber, setPageNumber] = useState(0);
  const [numPages, setNumPages] = useState(0);

  // document gestures
  Draggable.create(documentRef.current, {
    type: "x,y",
    bounds: viewerRef.current,

    zIndexBoost: false,
  });

  // scroller gestures
  Draggable.create(scrollThumbRef.current, {
    type: "left",
    bounds: scrollRef.current,
    onDragEnd: function () {
      handleThumb();
      handleTrack();
    },
    onDrag: handleTrack,
  });

  function handleThumb(page) {
    const thumbBounds = scrollThumbRef.current.getBoundingClientRect();
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

    gsap.set(scrollThumbRef.current, {
      left: `calc(${left * 100}% - ${thumbBounds.width / 2}px)`,
    });
    handleTrack();
  }

  function handleTrack() {
    gsap.set(scrollTrackRef.current, {
      right:
        scrollRef.current.getBoundingClientRect().right -
        scrollThumbRef.current.getBoundingClientRect().right,
    });
  }

  return (
    <div>
      <div className="w-full h-14 bg-guidon flex flex-row justify-between items-center px-24 relative">
        <button
          onClick={function () {
            history.back();
          }}
          className="font-chivo text-white flex flex-row items-center gap-x-1"
        >
          <img src={arrowLeft2} alt="" className="w-6" />
          Back
        </button>
        <h1 className="text-white text-xl font-tiemposheadline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          FreshManual 2023
        </h1>
        <div className="flex flex-row items-center justify-between gap-x-6">
          {/* <img src={twoPages} alt="Two Pages" />
          <img src={onePage} alt="One Page" />
          <div className="flex flex-row items-center justify-between gap-x-2">
            <img src={zoomOut} alt="Zoom Out" />
            <div
              ref={zoomRef}
              className="relative w-32 h-3 rounded-[0.625rem] bg-white"
            >
              <div
                ref={zoomTrackRef}
                className="absolute inset-0 right-auto bg-[#72A4D7] rounded-[inherit]"
              />
              <div
                ref={zoomThumbRef}
                className="absolute w-5 aspect-square top-1/2 -translate-y-1/2 left-0 bg-[#E9EEF2] rounded-full border-[1px] border-solid border-[#D2DDE5]"
              />
            </div>
            <img src={zoomIn} alt="Zoom In" />
          </div>
          <img src={fullscreen} alt="Fullscreen" /> */}
        </div>
      </div>
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
          className="absolute touch-none flex flex-row scale-[calc(550/1920)]"
        >
          {pageNumber <= 0 ? null : (
            <Page
              pageNumber={pageNumber}
              width={1920}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )}
          {pageNumber >= numPages ? null : (
            <Page
              pageNumber={pageNumber + 1}
              width={1920}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )}
        </Document>
      </div>
      <div className="w-full h-14 bg-[#DBE9F4] flex flex-row font-chivo text-[#666] items-center justify-center gap-x-5">
        <div
          ref={scrollRef}
          className="w-[70rem] h-4 rounded-[0.675rem] border-[#B6C2CD] border-[1px] bg-white relative"
        >
          <div
            ref={scrollTrackRef}
            className="absolute inset-0 right-auto bg-guidon rounded-[inherit]"
          />
          <div
            ref={scrollThumbRef}
            className="absolute top-1/2 -translate-y-1/2 rounded-full w-5 aspect-square border-[#6A757C] border-[1px] bg-[#E9EEF2] cursor-pointer touch-none"
          />
        </div>
        <p>{`Page${pageNumber > 0 && pageNumber < numPages ? "s" : ""} ${
          pageNumber > 0 ? pageNumber : ""
        }${pageNumber > 0 && pageNumber < numPages ? "-" : ""}${
          pageNumber + 1 < numPages ? pageNumber + 1 : ""
        } of ${numPages}`}</p>
      </div>
      <div className="h-[29rem] w-[77rem] flex flex-row justify-center items-center gap-x-10">
        <div className="relative w-[18rem] aspect-square bg-[#EFF5FA]">
          <img
            src={image}
            className="w-[10rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div>
          <h1 className="text-[2.5rem] font-tiemposheadline text-guidon font-bold leading-[1.4]">
            FreshManual 2023
          </h1>
          <p className="text-[#979797] font-chivo uppercase tracking-[0.04rem]">
            7 August 2023
          </p>
          <p className="font-chivo text-guidon"></p>
        </div>
        {/* TODO: sharing to socmed */}
      </div>
    </div>
  );
}
