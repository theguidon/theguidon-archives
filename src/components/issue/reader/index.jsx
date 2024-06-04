import "./index.css";
import "./fullscreen.css";
import { useState } from "react";

import sample from "./../../../assets/sample-2.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import SliderSection from "../slider-section";

function IssueReader(props) {
  const [tx, setTx] = useState(0.0);
  const [ty, setTy] = useState(0.0);
  const [docIsDragging, setDocIsDragging] = useState(false);
  const [ox, setOx] = useState(0.0);
  const [oy, setOy] = useState(0.0);
  const [loadedPages, setLoadedPages] = useState(0);

  const [showModal, setShowModal] = useState(true);

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   "pdfjs-dist/build/pdf.worker.min.mjs",
  //   import.meta.url
  // ).toString();

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const determineShowPage = (p) => {
    if (props.isDoubleReader) {
      if (props.page == 1) {
        return p == 1;
      } else {
        return p == props.page || p == props.page + 1;
      }
    } else {
      return p == props.page;
    }
  };

  const onStartDragging = (e) => {
    e.preventDefault();
    setDocIsDragging(true);
    // setOx(e.screenX);
    // setOy(e.screenY);
  };

  const onDrag = (e) => {
    // if (docIsDragging) {
    //   setTx(e.screenX - ox);
    //   setTy(e.screenY - oy);
    // }
  };

  const onEndDragging = (e) => {
    setDocIsDragging(false);
  };

  const getPageText = () => {
    if (props.page == 1) return `Page ${props.page}`;
    if (props.page == props.issue.num_pages) return `Page ${props.page}`;

    if (props.isDoubleReader) return `Pages ${props.page}-${props.page + 1}`;
    else return `Page ${props.page}`;
  };

  const getSliderPercentage = () => {
    if (props.isDoubleReader) {
      let cur = props.page == 1 ? 0 : props.page;
      let max =
        props.issue.num_pages % 2 == 1
          ? props.issue.num_pages - 1
          : props.issue.num_pages;

      return (cur / max) * 100;
    } else {
      return ((props.page - 1) / (props.issue.num_pages - 1)) * 100;
    }
  };

  const isLocalhost = () =>
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  return (
    <main id="reader">
      <div className="container">
        {!props.isLegacy && (
          <div className="edge left" onClick={props.onLeftClick}>
            <svg
              className="chevron"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 45"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.1998 41.0315C22.7391 41.0315 22.2783 40.8246 21.9273 40.413L7.52759 23.5242C6.82381 22.6987 6.82381 21.3645 7.52759 20.5391L21.9273 3.65033C22.6311 2.82489 23.7686 2.82489 24.4724 3.65033C25.1762 4.47577 25.1762 5.80998 24.4724 6.63542L11.3453 22.0316L24.4724 37.4279C25.1762 38.2533 25.1762 39.5875 24.4724 40.413C24.1214 40.8246 23.6606 41.0315 23.1998 41.0315Z"
              />
            </svg>
          </div>
        )}

        <div
          className={`document-container ${docIsDragging ? "dragging" : ""}`}
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${props.scale})`,
          }}
          onMouseDown={onStartDragging}
          onMouseMove={onDrag}
          onMouseUp={onEndDragging}
        >
          {props.isLegacy ? (
            <div className="document">
              <div className="page active">
                <img className="cover" src={props.issue.cover} />
              </div>
            </div>
          ) : (
            <Document
              file={isLocalhost() ? sample : props.issue.full_issue}
              // file={`/issues/${issue.fixed_slug}.pdf`}
              // file={sample}
              loading={null}
              onLoadError={console.error}
              className="document"
            >
              {[...Array(props.issue.num_pages)].map((_, idx) => (
                <Page
                  key={`page-${idx}`}
                  canvasBackground="white"
                  pageNumber={idx + 1}
                  onRenderSuccess={() => {
                    setLoadedPages((loaded) => loaded + 1);
                  }}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  height={2400}
                  className={`page ${
                    determineShowPage(idx + 1) ? "active" : ""
                  }`}
                />
              ))}
            </Document>
          )}
        </div>

        {!props.isLegacy && (
          <div className="edge right" onClick={props.onRightClick}>
            <svg
              className="chevron"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 45"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.80015 41.0315C9.26094 41.0315 9.72173 40.8246 10.0727 40.413L24.4724 23.5242C25.1762 22.6987 25.1762 21.3645 24.4724 20.5391L10.0727 3.65033C9.36894 2.82489 8.23137 2.82489 7.52758 3.65033C6.8238 4.47577 6.8238 5.80998 7.52758 6.63542L20.6547 22.0316L7.52758 37.4279C6.8238 38.2533 6.8238 39.5875 7.52758 40.413C7.87857 40.8246 8.33937 41.0315 8.80015 41.0315Z"
              />
            </svg>
          </div>
        )}
      </div>

      {showModal && loadedPages < props.issue.num_pages && (
        <div className="bg-tint">
          <div className="loading-modal">
            <svg
              className="close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.8282 16.0001L27.414 7.41422C28.196 6.63223 28.196 5.36824 27.414 4.58625C26.632 3.80426 25.3681 3.80426 24.5861 4.58625L16.0002 13.1722L7.41443 4.58625C6.63245 3.80426 5.36847 3.80426 4.58649 4.58625C3.8045 5.36824 3.8045 6.63223 4.58649 7.41422L13.1723 16.0001L4.58649 24.586C3.8045 25.368 3.8045 26.632 4.58649 27.414C4.97648 27.804 5.48847 28 6.00046 28C6.51245 28 7.02444 27.804 7.41443 27.414L16.0002 18.8281L24.5861 27.414C24.9761 27.804 25.4881 28 26 28C26.512 28 27.024 27.804 27.414 27.414C28.196 26.632 28.196 25.368 27.414 24.586L18.8282 16.0001Z"
              />
            </svg>

            <svg
              className="spinner"
              viewBox="0 0 112 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M73.277 11.2179C79.158 13.4868 84.5344 16.8918 89.0995 21.2386C93.6645 25.5853 97.3286 30.7886 99.8827 36.5515C102.437 42.3143 103.831 48.5237 103.985 54.8253C104.14 61.1268 103.051 67.3971 100.782 73.278C98.5134 79.159 95.1084 84.5355 90.7616 89.1005C86.4149 93.6655 81.2116 97.3296 75.4487 99.8837C69.6859 102.438 63.4765 103.832 57.1749 103.986C50.8733 104.141 44.6031 103.052 38.7221 100.783C32.8412 98.5144 27.4647 95.1094 22.8997 90.7626C18.3347 86.4159 14.6705 81.2126 12.1164 75.4498C9.56235 69.6869 8.16833 63.4775 8.01398 57.1759C7.85964 50.8744 8.94799 44.6041 11.2169 38.7232C13.4858 32.8422 16.8908 27.4657 21.2376 22.9007C25.5843 18.3357 30.7876 14.6716 36.5504 12.1175C42.3133 9.56336 48.5227 8.16934 54.8243 8.015C61.1258 7.86065 67.3961 8.949 73.277 11.2179L73.277 11.2179Z"
                stroke="#DBE9F4"
                strokeWidth="16"
              />
              <path
                d="M73.277 11.2179C80.3442 13.9445 86.6658 18.3049 91.7248 23.9427C96.7839 29.5805 100.437 36.3356 102.385 43.6557"
                stroke="#1C4480"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>

            <p className="loaded">{`${loadedPages} out of ${
              props.issue.num_pages
            } page${props.issue.num_pages > 1 ? "s" : ""} loaded`}</p>
            <p className="text">
              If the pages do not load, please view on desktop
            </p>
          </div>
        </div>
      )}

      {!props.issue.is_legacy && (
        <SliderSection
          sliderPercentage={getSliderPercentage()}
          pageText={`${getPageText()} of ${props.issue.num_pages}`}
          onLeftClick={props.onLeftClick}
          onRightClick={props.onRightClick}
        />
      )}
    </main>
  );
}

export default IssueReader;
