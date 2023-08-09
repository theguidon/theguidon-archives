import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowLeft2 from "../../assets/icons/arrow-left-2.svg";
import arrowGray from "../../assets/icons/arrow-gray.svg";
import twoPages from "../../assets/icons/two-pages.svg";
import onePage from "../../assets/icons/one-page.svg";
import zoomIn from "../../assets/icons/zoom-in.svg";
import zoomOut from "../../assets/icons/zoom-out.svg";
import fullscreen from "../../assets/icons/fullscreen.svg";

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

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(12);

  const [loadedPages, setLoadedPages] = useState(0);

  function leftPage() {
    let tempPageNum = pageNumber;

    if (pageNumber >= 1) tempPageNum--;

    if (window.innerWidth > 1024 && tempPageNum > 1 && tempPageNum % 2 === 1) {
      tempPageNum--;
    }

    setPageNumber(tempPageNum);
    handleThumb(tempPageNum);
  }
  function rightPage() {
    let tempPageNum = pageNumber;

    if (pageNumber < numPages) tempPageNum++;

    if (
      window.innerWidth > 1024 &&
      tempPageNum < numPages &&
      tempPageNum % 2 === 1
    ) {
      tempPageNum++;
    }

    setPageNumber(tempPageNum);
    handleThumb(tempPageNum);
  }

  function handleThumb(page) {
    const hundredPercent = scrollRef.current.getBoundingClientRect().width - 20;
    const percent = (page - 1) / (numPages - 1);
    gsap.set(scrollThumbRef.current, {
      left: hundredPercent * percent,
    });
    handleTrack();
  }

  Draggable.create(scrollThumbRef.current, {
    type: "left",
    bounds: scrollRef.current,
    onDragEnd: function () {
      handleScrub();
    },
    onDrag: handleTrack,
  });

  function handleTrack() {
    gsap.set(scrollTrackRef.current, {
      right:
        scrollRef.current.getBoundingClientRect().right -
        scrollThumbRef.current.getBoundingClientRect().right,
    });
  }

  function handleScrub() {
    const hundredPercent = scrollRef.current.getBoundingClientRect().width - 20;
    const percent =
      (scrollThumbRef.current.getBoundingClientRect().left -
        scrollRef.current.getBoundingClientRect().left) /
      hundredPercent;
    let page = 0;
    if (window.innerWidth >= 1024) {
      const pagePercent = gsap.utils.snap(1 / numPages, percent);
      const edge = gsap.utils.snap(1, pagePercent * (numPages - 1) + 1);
      page =
        edge === 1 || edge === numPages
          ? edge
          : gsap.utils.snap(2, pagePercent * (numPages - 1) + 1);
      console.log(page);
    } else {
      const pagePercent = gsap.utils.snap(1 / (numPages - 1), percent);
      page = gsap.utils.snap(1, pagePercent * (numPages - 1) + 1);
    }
    setPageNumber(page);
    handleThumb(page);
    handleTrack();
  }

  return (
    <div>
      <div className="w-full h-14 bg-guidon flex flex-row justify-between items-center px-4 sm:px-24 relative">
        {/* <button
          onClick={function () {
            history.back();
          }}
          className="font-chivo text-white flex flex-row items-center gap-x-1"
        >
          <img src={arrowLeft2} alt="" className="w-6" />
          <p className="hidden sm:block">Back</p>
        </button> */}
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
        className="h-min flex flex-row justify-center items-center relative"
      >
        <div className="w-full flex flex-row justify-between items-center h-full absolute">
          <button
            onClick={leftPage}
            disabled={pageNumber <= 1}
            className="h-full w-10 lg:w-20 z-10 pl-3 lg:pl-10 hover:bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0.20)_0%,_rgba(0,_0,_0,_0.00)_100%)] relative"
          >
            <img
              src={arrowLeft}
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
          <button
            onClick={rightPage}
            disabled={pageNumber >= numPages}
            className="h-full w-10 lg:w-20 z-10 hover:bg-[linear-gradient(-90deg,_rgba(0,_0,_0,_0.20)_0%,_rgba(0,_0,_0,_0.00)_100%)] relative"
          >
            <img
              src={arrowLeft}
              alt=""
              className="-scale-x-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        </div>
        <div className="max-h-[700px] h-[60vh]" />
        {loadedPages < numPages ? (
          <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 font-chivo flex flex-col items-center">
            <div className="w-12 aspect-square rounded-full border-4 border-t-guidon border-transparent animate-spin mb-4" />
            {loadedPages} out of {numPages} pages loaded
          </p>
        ) : null}
        <Document
          file={file}
          loading={null}
          inputRef={documentRef}
          className="absolute touch-none flex flex-row"
        >
          <Page
            canvasBackground="rgba(255, 255, 255, 0)"
            pageNumber={1}
            onRenderSuccess={() => {
              setLoadedPages((l) => l + 1);
            }}
            height={
              window.innerHeight * 0.6 < 700 ? window.innerHeight * 0.6 : 700
            }
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={pageNumber === 1 ? "block" : "hidden"}
          />

          {[...Array(Math.floor(numPages / 2) - 1)].map((num, index) => {
            return (
              <>
                <Page
                  canvasBackground="rgba(255, 255, 255, 0)"
                  pageNumber={(index + 1) * 2}
                  onRenderSuccess={() => {
                    setLoadedPages((l) => l + 1);
                  }}
                  height={
                    window.innerHeight * 0.6 < 700
                      ? window.innerHeight * 0.6
                      : 700
                  }
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className={
                    loadedPages === numPages
                      ? (index + 1) * 2 === pageNumber ||
                        (index + 1) * 2 + (window.innerWidth > 1024 ? 1 : 0) ===
                          pageNumber
                        ? "block"
                        : "hidden"
                      : "hidden"
                  }
                />
                <Page
                  canvasBackground="rgba(255, 255, 255, 0)"
                  pageNumber={(index + 1) * 2 + 1}
                  onRenderSuccess={() => {
                    setLoadedPages((l) => l + 1);
                  }}
                  height={
                    window.innerHeight * 0.6 < 700
                      ? window.innerHeight * 0.6
                      : 700
                  }
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className={
                    loadedPages === numPages
                      ? (index + 1) * 2 + (window.innerWidth > 1024 ? 0 : 1) ===
                        pageNumber
                        ? "block"
                        : "hidden"
                      : "hidden"
                  }
                />
              </>
            );
          })}
          <Page
            canvasBackground="rgba(255, 255, 255, 0)"
            pageNumber={numPages}
            onRenderSuccess={() => {
              setLoadedPages((l) => l + 1);
            }}
            height={
              window.innerHeight * 0.6 < 700 ? window.innerHeight * 0.6 : 700
            }
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={pageNumber === numPages ? "block" : "hidden"}
          />
        </Document>
      </div>
      <div className="w-full bg-[#DBE9F4] flex flex-col sm:flex-row font-chivo text-[#666] items-center justify-center gap-x-5 py-4 gap-y-3">
        <div
          ref={scrollRef}
          className="w-[22rem] max-w-[90%] lg:w-[50rem] h-4 rounded-[0.675rem] border-[#B6C2CD] border-[1px] bg-white relative"
        >
          <div
            ref={scrollTrackRef}
            className="absolute inset-0 right-auto bg-guidon rounded-[inherit]"
          />
          <div
            ref={scrollThumbRef}
            className="absolute top-1/2 -translate-y-1/2 rounded-full w-5 aspect-square border-[#6A757C] border-[1px] bg-[#E9EEF2] cursor-pointer touch-none"
          />
          <div />
        </div>
        <p className="flex flex-row items-center flex-shrink-0 gap-x-2">
          <button onClick={leftPage} disabled={pageNumber <= 1}>
            <img src={arrowGray} alt="" />
          </button>
          Page {pageNumber}
          {window.innerWidth >= 1024 && pageNumber > 1 && pageNumber < numPages
            ? "-" + (pageNumber + 1)
            : ""}{" "}
          of {numPages}
          <button
            disabled={pageNumber >= numPages}
            className="-scale-x-100"
            onClick={rightPage}
          >
            <img src={arrowGray} alt="" />
          </button>
        </p>
      </div>
    </div>
  );
}
