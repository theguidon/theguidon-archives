import { Link, useParams } from "react-router-dom";
import { DateFormatter } from "../../utils/date-formatter";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../redux/modules/issue";
import { setFullscreen } from "../../redux/modules/fullscreen";

import sample from "./../../assets/sample-2.pdf";

import "./index.css";
import "./reader.css";
import "./fullscreen.css";
import { Document, Page, pdfjs } from "react-pdf";
import TitleBar from "../../components/issue/title-bar";
import SliderSection from "../../components/issue/slider-section";

function IssuePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const issue = useSelector((state) => state.issue.data[slug]);

  const [isDoubleReader, setIsDoubleReader] = useState(true);
  const [page, setPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [scale, setScale] = useState(1.0);
  const [tx, setTx] = useState(0.0);
  const [ty, setTy] = useState(0.0);
  const [docIsDragging, setDocIsDragging] = useState(false);
  const [ox, setOx] = useState(0.0);
  const [oy, setOy] = useState(0.0);

  const mainRef = useRef(null);
  const documentRef = useRef(null);
  const [loadedPages, setLoadedPages] = useState(0);

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   "pdfjs-dist/build/pdf.worker.min.mjs",
  //   import.meta.url
  // ).toString();

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  useEffect(() => {
    dispatch(fetchIssue({ slug: slug }));
  }, []);

  const minZoom = 0.5;
  const maxZoom = 6.0;
  const zoomStep = 0.5;

  const onZoomIn = () => {
    let ns = scale;

    ns -= zoomStep;
    if (ns <= minZoom) ns = minZoom;

    setScale(ns);
  };

  const onZoomOut = () => {
    let ns = scale;

    ns += zoomStep;
    if (ns >= maxZoom) ns = maxZoom;

    setScale(ns);
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

  const onLeftClick = () => {
    let np = page;

    if (isDoubleReader) {
      np -= 2;
      if (np % 2 == 1) np--;
    } else np--;

    if (np <= 0) np = 1;

    setPage(np);
  };

  const onRightClick = () => {
    let np = page;

    if (isDoubleReader) {
      np += 2;
      if (np % 2 == 1) np--;

      if (issue.num_pages % 2 == 1 && np >= issue.num_pages)
        np = issue.num_pages - 1;
    } else np++;

    if (np > issue.num_pages) np = issue.num_pages;

    setPage(np);
  };

  const getPageText = () => {
    if (page == 1) return `Page ${page}`;
    if (page == issue.num_pages) return `Page ${page}`;

    if (isDoubleReader) return `Pages ${page}-${page + 1}`;
    else return `Page ${page}`;
  };

  const getSliderPercentage = () => {
    if (isDoubleReader) {
      let cur = page == 1 ? 0 : page;
      let max =
        issue.num_pages % 2 == 1 ? issue.num_pages - 1 : issue.num_pages;

      return (cur / max) * 100;
    } else {
      return ((page - 1) / (issue.num_pages - 1)) * 100;
    }
  };

  useEffect(() => {
    if (isDoubleReader && page > 1 && page % 2 == 1) setPage(page - 1);
  }, [isDoubleReader]);

  const determineShowPage = (p) => {
    if (isDoubleReader) {
      if (page == 1) {
        return p == 1;
      } else {
        return p == page || p == page + 1;
      }
    } else {
      return p == page;
    }
  };

  const isLocalhost = () =>
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const toggleFullscreen = () => {
    dispatch(setFullscreen(!isFullscreen));
    setIsFullscreen((p) => !p);
  };

  return (
    issue != null && (
      <div id="issue" className={isFullscreen ? "fullscreen" : ""}>
        <TitleBar
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          zoom={((scale - minZoom) / (maxZoom - minZoom)) * 100}
          isDoubleReader={isDoubleReader}
          setIsDoubleReader={setIsDoubleReader}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />

        <main id="reader" ref={mainRef}>
          <div className="edge left" onClick={onLeftClick}>
            <svg
              className="chevron"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 45"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.1998 41.0315C22.7391 41.0315 22.2783 40.8246 21.9273 40.413L7.52759 23.5242C6.82381 22.6987 6.82381 21.3645 7.52759 20.5391L21.9273 3.65033C22.6311 2.82489 23.7686 2.82489 24.4724 3.65033C25.1762 4.47577 25.1762 5.80998 24.4724 6.63542L11.3453 22.0316L24.4724 37.4279C25.1762 38.2533 25.1762 39.5875 24.4724 40.413C24.1214 40.8246 23.6606 41.0315 23.1998 41.0315Z"
                fill="#B6C2CD"
              />
            </svg>
          </div>

          <div
            className={`document-container ${docIsDragging ? "dragging" : ""}`}
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}
            onMouseDown={onStartDragging}
            onMouseMove={onDrag}
            onMouseUp={onEndDragging}
          >
            <Document
              file={isLocalhost() ? sample : issue.full_issue}
              // file={`/issues/${issue.fixed_slug}.pdf`}
              // file={sample}
              loading={null}
              inputRef={documentRef}
              onLoadError={console.error}
              className="document"
            >
              {[...Array(issue.num_pages)].map((_, idx) => (
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
          </div>

          <div className="edge right" onClick={onRightClick}>
            <svg
              className="chevron"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 45"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.80015 41.0315C9.26094 41.0315 9.72173 40.8246 10.0727 40.413L24.4724 23.5242C25.1762 22.6987 25.1762 21.3645 24.4724 20.5391L10.0727 3.65033C9.36894 2.82489 8.23137 2.82489 7.52758 3.65033C6.8238 4.47577 6.8238 5.80998 7.52758 6.63542L20.6547 22.0316L7.52758 37.4279C6.8238 38.2533 6.8238 39.5875 7.52758 40.413C7.87857 40.8246 8.33937 41.0315 8.80015 41.0315Z"
                fill="#B6C2CD"
              />
            </svg>
          </div>
        </main>

        <SliderSection
          sliderPercentage={getSliderPercentage()}
          pageText={`${getPageText()} of ${issue.num_pages}`}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />

        <section id="issue-info" className="general-container">
          <div className="cover-container">
            <img src={issue.cover} alt={issue.title} />
          </div>

          <div className="info">
            <h3 className="title">{issue.title}</h3>

            <p className="date">{DateFormatter(issue.date_published)}</p>
            <p className="desc">{issue.description}</p>

            <p className="share">Share</p>
            <div className="socials">
              <Link
                to={`http://www.facebook.com/sharer.php?u=https://archives.theguidon.com/issue/${issue.fixed_slug}`}
                target="_blank"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
                </svg>
              </Link>

              <Link
                to={`http://x.com/share?url=https://issues.theguidon.com/issue/${issue.fixed_slug}&text=${issue.title}`}
                target="_blank"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.8998 11.1983L19.0923 4H17.6249L12.2479 10.2502L7.9533 4H3L9.49426 13.4514L3 21H4.46752L10.1458 14.3996L14.6812 21H19.6345L12.8994 11.1983H12.8998ZM10.8898 13.5347L10.2318 12.5936L4.99629 5.10473H7.25031L11.4754 11.1485L12.1334 12.0896L17.6256 19.9455H15.3715L10.8898 13.5351V13.5347Z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default IssuePage;
