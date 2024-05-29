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

import chevron_left from "./../../assets/icons/chevron-left.svg";
import chevron_right from "./../../assets/icons/chevron-right.svg";
import chevron_reader_left from "./../../assets/icons/chevron-reader-left.svg";
import chevron_reader_right from "./../../assets/icons/chevron-reader-right.svg";

import icon_facebook from "./../../assets/icons/facebook.svg";
import icon_twitter from "./../../assets/icons/twitter.svg";

import sample from "./../../assets/sample.pdf";

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
  const [viewerHeight, setViewerHeight] = useState(500);
  const [scale, setScale] = useState(1.0);

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

  const minZoom = 0.75;
  const maxZoom = 2.0;

  const onZoomIn = () => {
    let ns = scale;

    ns -= 0.05;
    if (ns <= minZoom) ns = minZoom;

    setScale(ns);
  };

  const onZoomOut = () => {
    let ns = scale;

    ns += 0.05;
    if (ns >= maxZoom) ns = maxZoom;

    setScale(ns);
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

  // useEffect(() => {
  //   if (mainRef.current)
  //     console.log(mainRef.current.getBoundingClientRect().height);
  // }, [window.innerWidth]);

  return (
    issue != null && (
      <div id="issue">
        <section className="title-bar">
          <div className="general-container">
            <div className="controls-left">
              <Link to={``} className="back-group">
                <div
                  className="chevron"
                  style={{
                    maskImage: `url(${chevron_left})`,
                    WebkitMaskImage: `url(${chevron_left})`,
                  }}
                />
                <p className="back">Back</p>
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
            <div
              className="chevron"
              style={{
                maskImage: `url(${chevron_reader_left})`,
                WebkitMaskImage: `url(${chevron_reader_left})`,
              }}
            />
          </div>

          <div
            className="document-container"
            style={{ transform: `scale(${scale})` }}
          >
            <Document
              // file={issue.full_issue}
              // file={`/issues/${issue.fixed_slug}.pdf`}
              file={sample}
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
                  height={1080}
                  className={`page ${
                    determineShowPage(idx + 1) ? "active" : ""
                  }`}
                />
              ))}
            </Document>
          </div>

          <div className="edge right" onClick={onRightClick}>
            <div
              className="chevron"
              style={{
                maskImage: `url(${chevron_reader_right})`,
                WebkitMaskImage: `url(${chevron_reader_right})`,
              }}
            />
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
              <div
                className="chevron"
                style={{
                  maskImage: `url(${chevron_left})`,
                  WebkitMaskImage: `url(${chevron_left})`,
                }}
                onClick={onLeftClick}
              />

              <p className="page">{`${getPageText()} of ${issue.num_pages}`}</p>

              <div
                className="chevron"
                style={{
                  maskImage: `url(${chevron_right})`,
                  WebkitMaskImage: `url(${chevron_right})`,
                }}
                onClick={onRightClick}
              />
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
                style={{
                  maskImage: `url(${icon_facebook})`,
                  WebkitMaskImage: `url(${icon_facebook})`,
                }}
              ></Link>

              <Link
                to={`http://x.com/share?url=https://issues.theguidon.com/issue/${issue.fixed_slug}&text=${issue.title}`}
                style={{
                  maskImage: `url(${icon_twitter})`,
                  WebkitMaskImage: `url(${icon_twitter})`,
                }}
              ></Link>
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default IssuePage;
