import { Link, useNavigate, useParams } from "react-router-dom";
import { DateFormatter, formatBylines } from "../../utils";
import React, { useEffect, useRef, useState } from "react";
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
  const [issueContent, setIssueContent] = useState([]);
  const [contributors, setContributors] = useState([]);

  const [TOCActive, setTOCActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const [isDoubleReader, setIsDoubleReader] = useState(true);
  const [page, setPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [scale, setScale] = useState(1.0);

  const [initOnMobile, setInitOnMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchIssue({ slug: slug }));

    if (document.body.clientWidth <= 576) {
      setInitOnMobile(true);
      setIsDoubleReader(false);
    }
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

        if (issue.issue_content != null)
          setIssueContent(JSON.parse(issue.issue_content));
        if (issue.contributors != null)
          setContributors(JSON.parse(issue.contributors));
      }
    }
  }, [issue]);

  return (
    // issue != null && (
    <div id="issue" className={isFullscreen ? "fullscreen" : ""}>
      <IssueReader
        loading={issue == null}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        hasActiveModal={TOCActive || searchActive}
        isDoubleReader={isDoubleReader}
        setIsDoubleReader={setIsDoubleReader}
        scale={scale}
        issue={issue}
        page={page}
        setPage={setPage}
        isLegacy={issue != null ? issue.is_legacy : false}
        maxZoom={maxZoom}
        titleBar={
          <TitleBar
            loading={issue == null}
            issueContent={issueContent}
            title={issue != null ? issue.title : null}
            TOCActive={TOCActive}
            setTOCActive={setTOCActive}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            minZoom={minZoom}
            maxZoom={maxZoom}
            setScale={setScale}
            zoom={((scale - minZoom) / (maxZoom - minZoom)) * 100}
            initOnMobile={initOnMobile}
            isDoubleReader={isDoubleReader}
            setIsDoubleReader={setIsDoubleReader}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            setPage={setPage}
            isLegacy={issue != null ? issue.is_legacy : false}
          />
        }
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

              {/* <svg
                // width="24"
                // height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                onClick={async () => {
                  const canvas = document.createElement("canvas");
                  canvas.width = 1080;
                  canvas.height = 1920;

                  const ctx = canvas.getContext("2d");
                  ctx.fillStyle = "red";
                  ctx.fillRect(0, 0, 150, 150);

                  const cover = new Image();
                  cover.src = issue.cover_full;
                  cover.crossOrigin = "anonymous";

                  cover.onload = () => {
                    ctx.drawImage(cover, 0, 0);

                    canvas.toBlob((blob) => {
                      let data = {
                        files: [
                          new File([blob], "file.png", {
                            type: blob.type,
                          }),
                        ],
                        title: issue.title,
                        text: issue.fixed_slug,
                        url: "https://dev.theguidon.com",
                      };

                      if (
                        window.navigator.canShare &&
                        window.navigator.canShare(data)
                      )
                        window.navigator.share(data);
                    });
                  };
                }}
              >
                <path
                  d="M12 8.75C11.138 8.75 10.3114 9.09241 9.7019 9.7019C9.09241 10.3114 8.75 11.138 8.75 12C8.75 12.862 9.09241 13.6886 9.7019 14.2981C10.3114 14.9076 11.138 15.25 12 15.25C12.862 15.25 13.6886 14.9076 14.2981 14.2981C14.9076 13.6886 15.25 12.862 15.25 12C15.25 11.138 14.9076 10.3114 14.2981 9.7019C13.6886 9.09241 12.862 8.75 12 8.75Z"
                  // fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.77 3.082C10.246 2.6967 13.754 2.6967 17.23 3.082C19.129 3.294 20.66 4.789 20.883 6.695C21.2952 10.2197 21.2952 13.7803 20.883 17.305C20.66 19.211 19.129 20.706 17.231 20.919C13.7547 21.3044 10.2464 21.3044 6.77 20.919C4.871 20.706 3.34 19.211 3.117 17.306C2.70473 13.781 2.70473 10.22 3.117 6.695C3.34 4.789 4.871 3.294 6.77 3.082ZM17 6C16.7348 6 16.4804 6.10536 16.2929 6.2929C16.1054 6.48043 16 6.73479 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89465 16.7348 8 17 8C17.2652 8 17.5196 7.89465 17.7071 7.70711C17.8946 7.51957 18 7.26522 18 7C18 6.73479 17.8946 6.48043 17.7071 6.2929C17.5196 6.10536 17.2652 6 17 6ZM7.25 12C7.25 10.7402 7.75045 9.53205 8.64125 8.64125C9.53205 7.75045 10.7402 7.25 12 7.25C13.2598 7.25 14.468 7.75045 15.3588 8.64125C16.2496 9.53205 16.75 10.7402 16.75 12C16.75 13.2598 16.2496 14.468 15.3588 15.3588C14.468 16.2496 13.2598 16.75 12 16.75C10.7402 16.75 9.53205 16.2496 8.64125 15.3588C7.75045 14.468 7.25 13.2598 7.25 12Z"
                  // fill="white"
                />
              </svg> */}
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

      {issue != null &&
        (issueContent.length > 0 ||
          (contributors.length > 0 && !issue.is_legacy)) && (
          <section id="issue-content">
            <div className="general-container">
              {issueContent.length > 0 && (
                <>
                  <h4 id="in-this-issue">In this issue</h4>

                  <div className="content-container">
                    {issueContent.map((section, idx) => (
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

                              {article.bylines.length > 0 && (
                                <p
                                  className="bylines"
                                  dangerouslySetInnerHTML={{
                                    __html: `By ${formatBylines(
                                      article.bylines
                                    )}`,
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {contributors.length > 0 && (
                <>
                  <h4 id="contributors">Contributors</h4>

                  <div className="contributors-container">
                    {contributors.map((group, idx) => (
                      <div className="group" key={`contribs-group-${idx}`}>
                        <p className="group-name">{group.name}</p>
                        <hr />

                        <div
                          className={`people-container ${
                            group.people.filter((p) => p.title.length > 0)
                              .length > 1
                              ? ""
                              : "no-title"
                          }`}
                          style={{
                            gridTemplateRows: `repeat(${Math.ceil(
                              group.people.length / 2
                            )}, auto)`,
                          }}
                        >
                          {group.people.map((person, idx2) => {
                            if (person.title.length > 0) {
                              return (
                                <div
                                  className="person"
                                  key={`contributors-group-${idx}-${idx2}`}
                                >
                                  <p className="byline">{person.byline}</p>
                                  <p className="title">{person.title}</p>
                                </div>
                              );
                            } else {
                              return (
                                <p
                                  className="byline"
                                  key={`contributors-group-${idx}-${idx2}`}
                                >
                                  {person.byline}
                                </p>
                              );
                            }
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
    </div>
    // )
  );
}

export default IssuePage;
