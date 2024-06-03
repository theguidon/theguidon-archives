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
import IssueReader from "../../components/issue/reader";

function IssuePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const issue = useSelector((state) => state.issue.data[slug]);

  const [isDoubleReader, setIsDoubleReader] = useState(true);
  const [page, setPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [scale, setScale] = useState(1.0);

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

  const toggleFullscreen = () => {
    dispatch(setFullscreen(!isFullscreen));
    setIsFullscreen((p) => !p);
  };

  return (
    issue != null && (
      <div id="issue" className={isFullscreen ? "fullscreen" : ""}>
        <TitleBar
          title={issue.title}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          zoom={((scale - minZoom) / (maxZoom - minZoom)) * 100}
          isDoubleReader={isDoubleReader}
          setIsDoubleReader={setIsDoubleReader}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />

        <IssueReader
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
          isDoubleReader={isDoubleReader}
          scale={scale}
          issue={issue}
          page={page}
        />

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
