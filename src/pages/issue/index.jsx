import { Link, useNavigate, useParams } from "react-router-dom";
import { DateFormatter, formatBylines } from "../../utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../redux/modules/issue";
import { setFullscreen } from "../../redux/modules/fullscreen";

import "./index.css";
import "./fullscreen.css";
import TitleBar from "../../components/issue/title-bar";
import IssueReader from "../../components/issue/reader";
import { ArchivesData } from "../../data/archives";

import { setDocumentTitle } from "../../utils";

function IssuePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const issue = useSelector((state) => state.issue.data[slug]);
  const [articleContent, setArticleContent] = useState([]);

  const [isDoubleReader, setIsDoubleReader] = useState(true);
  const [page, setPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    dispatch(fetchIssue({ slug: slug }));
  }, []);

  const minZoom = 0.5;
  const maxZoom = 6.0;
  const zoomStep = 0.25;

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

  useEffect(() => {
    if (isDoubleReader && page > 1 && page % 2 == 1) setPage(page - 1);
  }, [isDoubleReader]);

  const toggleFullscreen = () => {
    dispatch(setFullscreen(!isFullscreen));
    setIsFullscreen((p) => !p);
  };

  useEffect(() => {
    if (issue != null) {
      if (Object.keys(issue).length == 0) navigate("/404");
      else {
        setDocumentTitle(issue.title);

        setArticleContent(JSON.parse(issue.article_content));
      }
    }
  }, [issue]);

  return (
    // issue != null && (
    <div id="issue" className={isFullscreen ? "fullscreen" : ""}>
      <TitleBar
        loading={issue == null}
        articleContent={articleContent}
        title={issue != null ? issue.title : null}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        minZoom={minZoom}
        maxZoom={maxZoom}
        setScale={setScale}
        zoom={((scale - minZoom) / (maxZoom - minZoom)) * 100}
        isDoubleReader={isDoubleReader}
        setIsDoubleReader={setIsDoubleReader}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        setPage={setPage}
        isLegacy={issue != null ? issue.is_legacy : false}
      />

      <IssueReader
        loading={issue == null}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        isDoubleReader={isDoubleReader}
        scale={scale}
        issue={issue}
        page={page}
        setPage={setPage}
        isLegacy={issue != null ? issue.is_legacy : false}
        maxZoom={maxZoom}
      />

      <section id="issue-metadata" className="general-container">
        {issue != null ? (
          <div className="cover-container">
            <img className="cover" src={issue.cover} alt={issue.title} />
          </div>
        ) : (
          <div className="cover-container loading" />
        )}

        {issue != null ? (
          <div className="info">
            {issue.volume_num != null && issue.issue_num != null && (
              <p className="vol-issue">
                {"Vol. " + issue.volume_num + ", No. " + issue.issue_num}
              </p>
            )}
            <h3 className="title">{issue.title}</h3>
            <p className="date">{DateFormatter(issue.date_published)}</p>

            {issue.is_legacy ? (
              <>
                <p className="to-access">
                  To access the complete issue, please visit:
                </p>

                <div className="rows-container">
                  {Object.keys(ArchivesData).map((key, idx) => (
                    <div className="row" key={`metadata-${key}`}>
                      {ArchivesData[key].icon}

                      <p
                        dangerouslySetInnerHTML={{
                          __html: ArchivesData[key].text,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="desc">{issue.description}</p>
            )}

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
        ) : (
          <div className="info">
            <div className="vol-issue loading" />
            <div
              className="title loading"
              style={{ maxWidth: `${Math.random() * 200 + 400}px` }}
            />
            <div
              className="date loading"
              style={{ maxWidth: `${Math.random() * 100 + 150}px` }}
            />
            <div
              className="desc loading"
              style={{
                maxWidth: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 60 + 40}px`,
              }}
            />
          </div>
        )}
      </section>

      {issue != null && articleContent.length > 0 && (
        <section id="issue-content">
          <div className="general-container">
            <h4>In this issue</h4>

            {articleContent.map((section, idx) => (
              <div className="section" key={`content-section-${idx}`}>
                <p className="section-name">{section.name}</p>
                <hr />

                <div
                  className="articles-container"
                  style={{
                    gridTemplateRows: `repeat(${Math.ceil(
                      section.articles.length / 2
                    )}, auto)`,
                  }}
                >
                  {section.articles.map((article, idx2) => (
                    <div
                      className="article"
                      key={`content-section-${idx}-${idx2}`}
                    >
                      <p
                        className="title"
                        dangerouslySetInnerHTML={{
                          __html: article.title,
                        }}
                      />
                      <p
                        className="bylines"
                        dangerouslySetInnerHTML={{
                          __html: `By ${formatBylines(article.bylines)}`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
    // )
  );
}

export default IssuePage;
