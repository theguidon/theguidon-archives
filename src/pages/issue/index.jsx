import { Link, useParams } from "react-router-dom";
import { DateFormatter } from "../../utils/date-formatter";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../redux/modules/issue";

import list from "./../../assets/icons/list.svg";
import search from "./../../assets/icons/search-white.svg";
import reader_double from "./../../assets/icons/reader-double.svg";
import reader_single from "./../../assets/icons/reader-single.svg";
import zoom_in from "./../../assets/icons/zoom-in.svg";
import zoom_out from "./../../assets/icons/zoom-out.svg";
import fullscreen_enter from "./../../assets/icons/fullscreen-enter.svg";

import sample from "./../../assets/sample-2.pdf";

import "./index.css";
import "./title-bar.css";
import "./reader.css";
import "./slider-section.css";
import { Document, Page, pdfjs } from "react-pdf";

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

  return (
    issue != null && (
      <div id="issue">
        <section className="title-bar">
          <div className="general-container">
            <div className="controls-left">
              <Link to={``} className="back-group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.2528 7.91226C15.6219 7.57846 15.6512 7.00787 15.3183 6.63781C14.9853 6.26776 14.4162 6.23837 14.0472 6.57217L8.74512 11.3674C8.34795 11.7266 8.34904 12.3518 8.74746 12.7096L14.0032 17.4296C14.3735 17.7621 14.9425 17.7307 15.2741 17.3595C15.6057 16.9883 15.5744 16.4178 15.2042 16.0853L11.0245 12.3316C10.8479 12.1731 10.8474 11.8966 11.0234 11.7374L15.2528 7.91226Z"
                    fill="white"
                  />
                </svg>
                Back
              </Link>

              <div className="controls-group">
                <img className="list icon" src={list} />
                <img className="search icon" src={search} />
              </div>
            </div>

            <h6 className="title">{issue.title}</h6>

            <div className="controls-right">
              <div className="reader-group">
                <img
                  className={`reader icon ${isDoubleReader ? "active" : ""}`}
                  src={reader_double}
                  onClick={() => setIsDoubleReader(true)}
                />
                <img
                  className={`reader icon ${isDoubleReader ? "" : "active"}`}
                  src={reader_single}
                  onClick={() => setIsDoubleReader(false)}
                />
              </div>

              <div className="zoom-group">
                <img className="zoom icon" src={zoom_in} onClick={onZoomIn} />

                <div className="zoom-container">
                  <div
                    className="zoom-fill"
                    style={{
                      width: `${
                        ((scale - minZoom) / (maxZoom - minZoom)) * 100
                      }%`,
                    }}
                  />
                  <div
                    className="zoom-circle"
                    style={{
                      left: `${
                        ((scale - minZoom) / (maxZoom - minZoom)) * 100
                      }%`,
                    }}
                  />
                </div>

                <img className="zoom icon" src={zoom_out} onClick={onZoomOut} />
              </div>

              <img className="fullscreen icon" src={fullscreen_enter} />
            </div>
          </div>
        </section>

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

        <section className="slider-section">
          <div className="general-container">
            <div className="slider">
              <div
                className="slider-fill"
                style={{
                  width: `${getSliderPercentage()}%`,
                }}
              />
              <div
                className="slider-circle"
                style={{
                  left: `${getSliderPercentage()}%`,
                }}
              />
            </div>

            <div className="text-controls">
              <svg
                className="chevron"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 21"
                fill="none"
                onClick={onLeftClick}
              >
                <path
                  d="M12.7107 6.6248C13.0182 6.34663 13.0427 5.87114 12.7652 5.56276C12.4878 5.25438 12.0135 5.22989 11.706 5.50806L7.28759 9.50408C6.95661 9.80342 6.95752 10.3244 7.28954 10.6226L11.6693 14.5559C11.9779 14.833 12.452 14.8069 12.7284 14.4975C13.0048 14.1882 12.9787 13.7128 12.6701 13.4357L9.24207 10.357C9.06551 10.1985 9.06503 9.92195 9.24103 9.76277L12.7107 6.6248Z"
                  fill="#666666"
                />
              </svg>

              <p className="page">{`${getPageText()} of ${issue.num_pages}`}</p>

              <svg
                className="chevron"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 21"
                fill="none"
                onClick={onRightClick}
              >
                <path
                  d="M7.28934 13.4377C6.98177 13.7159 6.95735 14.1914 7.23479 14.4997C7.51223 14.8081 7.98647 14.8326 8.29404 14.5544L12.7124 10.5584C13.0434 10.2591 13.0425 9.73809 12.7105 9.43992L8.33066 5.50656C8.02212 5.22947 7.54796 5.25563 7.2716 5.56498C6.99524 5.87433 7.02132 6.34973 7.32986 6.62682L10.7579 9.70546C10.9345 9.86402 10.935 10.1405 10.759 10.2997L7.28934 13.4377Z"
                  fill="#666666"
                />
              </svg>
            </div>
          </div>
        </section>

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
