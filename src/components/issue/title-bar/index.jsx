import "./index.css";
import "./fullscreen.css";
import "./list.css";
import "./list-fullscreen.css";
import "./search.css";
import "./search-fullscreen.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import content from "./sample.json";

function TitleBar(props) {
  const navigate = useNavigate();

  const [TOCActive, setTOCActive] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const searchFieldRef = useRef(null);

  const getFilteredContent = () => {
    if (query === "") return [];

    let filtered = [];
    let lc = query.toLowerCase();

    content.forEach((section) => {
      let articles;

      if (section.name.toLowerCase().includes(lc)) {
        articles = section.articles;
      } else {
        articles = section.articles.filter((article) => {
          if (article.title.toLowerCase().includes(lc)) return true;
          if (article.bylines.toLowerCase().includes(lc)) return true;

          return false;
        });
      }

      if (articles.length > 0) {
        filtered.push({
          name: section.name,
          articles: articles,
        });
      }
    });

    return filtered;
  };

  const goToArticle = (article) => {
    props.setPage(
      article.page % 2 == 1
        ? article.page == 1
          ? 1
          : props.isDoubleReader
          ? article.page - 1
          : article.page
        : article.page
    );
  };

  useEffect(() => {
    if (searchFieldRef.current != null) {
      if (searchActive) searchFieldRef.current.focus();
    }
  }, [searchActive]);

  const getLeftControls = () => (
    <div className="controls-left">
      <div
        className="back-group"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.2528 7.91226C15.6219 7.57846 15.6512 7.00787 15.3183 6.63781C14.9853 6.26776 14.4162 6.23837 14.0472 6.57217L8.74512 11.3674C8.34795 11.7266 8.34904 12.3518 8.74746 12.7096L14.0032 17.4296C14.3735 17.7621 14.9425 17.7307 15.2741 17.3595C15.6057 16.9883 15.5744 16.4178 15.2042 16.0853L11.0245 12.3316C10.8479 12.1731 10.8474 11.8966 11.0234 11.7374L15.2528 7.91226Z" />
        </svg>
        <p>Back</p>
      </div>

      {!props.isLegacy && (
        <div className="controls-group">
          <div className="list-container">
            <div
              className={`list icon ${TOCActive ? "active" : ""}`}
              onClick={() => {
                setTOCActive((v) => !v);
                if (searchActive) setSearchActive(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 14C3.55228 14 4 14.4477 4 15C4 15.5523 3.55228 16 3 16C2.44772 16 2 15.5523 2 15C2 14.4477 2.44772 14 3 14ZM17 14C17.5523 14 18 14.4477 18 15C18 15.5523 17.5523 16 17 16H7C6.44772 16 6 15.5523 6 15C6 14.4477 6.44772 14 7 14H17ZM3 9C3.55228 9 4 9.44772 4 10C4 10.5523 3.55228 11 3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9ZM17 9C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H7C6.44772 11 6 10.5523 6 10C6 9.44772 6.44772 9 7 9H17ZM3 4C3.55228 4 4 4.44772 4 5C4 5.55228 3.55228 6 3 6C2.44772 6 2 5.55228 2 5C2 4.44772 2.44772 4 3 4ZM17 4C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H7C6.44772 6 6 5.55228 6 5C6 4.44772 6.44772 4 7 4H17Z"
                />
              </svg>
            </div>

            <div className={`popup ${TOCActive ? "active" : ""}`}>
              <p className="heading">Table of Contents</p>

              {content.map((section, idx) => (
                <React.Fragment key={`section-${idx}`}>
                  <div
                    className={`section-row ${
                      openAccordions.includes(section.name) ? "active" : ""
                    }`}
                    onClick={() => {
                      let nactive = [...openAccordions];
                      if (openAccordions.includes(section.name)) {
                        nactive.splice(nactive.indexOf(section.name), 1);
                      } else {
                        nactive.push(section.name);
                      }

                      setOpenAccordions(nactive);
                    }}
                  >
                    <p className="name">{section.name}</p>

                    <svg
                      className="chevron"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 17"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.70711 6.00188C3.31658 5.61135 2.68342 5.61135 2.29289 6.00188C1.90237 6.3924 1.90237 7.02557 2.29289 7.41609L7.29289 12.4161C7.68342 12.8066 8.31658 12.8066 8.70711 12.4161L13.7071 7.41609C14.0976 7.02557 14.0976 6.3924 13.7071 6.00188C13.3166 5.61135 12.6834 5.61135 12.2929 6.00188L8 10.2948L3.70711 6.00188Z"
                      />
                    </svg>
                  </div>

                  <div
                    className={`section-content ${
                      openAccordions.includes(section.name) ? "active" : ""
                    }`}
                  >
                    {section.articles.map((article, idx2) => (
                      <div
                        className="article"
                        key={`section-${idx}-article-${idx2}`}
                        onClick={() => goToArticle(article)}
                      >
                        <p
                          className="title"
                          dangerouslySetInnerHTML={{
                            __html: article.title,
                          }}
                        />
                        <p className="page">{article.page}</p>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div
            className={`search-container ${searchActive ? "active" : ""}`}
            onClick={() => {
              if (!searchActive) {
                setSearchActive(true);
                setQuery("");

                if (TOCActive) setTOCActive(false);

                // if (searchFieldRef != null) searchFieldRef.current.focus();
              }
            }}
          >
            <div className="search-row">
              <div className="search icon">
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.8004 2.40039C15.4396 2.40039 19.2004 6.1612 19.2004 10.8004C19.2004 12.692 18.5751 14.4377 17.5199 15.8418L17.5858 15.8933L17.6489 15.9519L21.2489 19.5519C21.7175 20.0205 21.7175 20.7803 21.2489 21.2489C20.8163 21.6815 20.1357 21.7148 19.6649 21.3487L19.5519 21.2489L15.9519 17.6489C15.9108 17.6079 15.8734 17.5646 15.8395 17.5195C14.4377 18.5751 12.692 19.2004 10.8004 19.2004C6.1612 19.2004 2.40039 15.4396 2.40039 10.8004C2.40039 6.1612 6.1612 2.40039 10.8004 2.40039ZM10.8004 4.80039C7.48668 4.80039 4.80039 7.48668 4.80039 10.8004C4.80039 14.1141 7.48668 16.8004 10.8004 16.8004C14.1141 16.8004 16.8004 14.1141 16.8004 10.8004C16.8004 7.48668 14.1141 4.80039 10.8004 4.80039Z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={searchFieldRef}
              />

              <div
                className="close icon"
                onClick={() => {
                  if (searchActive) setSearchActive(false);
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  stroke="currentStroke"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99967 14.6693C11.6817 14.6693 14.6663 11.6846 14.6663 8.0026C14.6663 4.3206 11.6817 1.33594 7.99967 1.33594C4.31767 1.33594 1.33301 4.3206 1.33301 8.0026C1.33301 11.6846 4.31767 14.6693 7.99967 14.6693Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.33333"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.88535 6.11719L6.11401 9.88852M6.11401 6.11719L9.88535 9.88852"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {getFilteredContent().length > 0 && (
              <div className="search-results">
                {getFilteredContent().map((section, idx) => (
                  <React.Fragment key={`search-section-${idx}`}>
                    <div className="section-row">
                      <p className="name">{section.name}</p>
                    </div>

                    <div className="section-content">
                      {section.articles.map((article, idx2) => (
                        <div
                          className="article"
                          key={`search-section-${idx}-article-${idx2}`}
                          onClick={() => goToArticle(article)}
                        >
                          <p
                            className="title"
                            dangerouslySetInnerHTML={{
                              __html: article.title,
                            }}
                          />
                          <p className="page">{article.page}</p>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const getRightControls = () => (
    <div className="controls-right">
      {!props.isLegacy && (
        <div className="reader-group">
          <div
            className={`reader icon ${props.isDoubleReader ? "active" : ""}`}
            onClick={() => props.setIsDoubleReader(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect
                x="0.909091"
                y="0.909091"
                width="14.1818"
                height="14.1818"
                rx="2"
                fill="white"
                stroke="white"
                strokeWidth="1.81818"
              />
              <line
                x1="3.63548"
                y1="4.36355"
                x2="6.54457"
                y2="4.36355"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="9.45384"
                y1="4.36355"
                x2="12.3629"
                y2="4.36355"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="3.63548"
                y1="11.6365"
                x2="6.54457"
                y2="11.6365"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="9.45384"
                y1="11.6365"
                x2="12.3629"
                y2="11.6365"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="3.63548"
                y1="7.99978"
                x2="6.54457"
                y2="7.99978"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="9.45384"
                y1="7.99978"
                x2="12.3629"
                y2="7.99978"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 17"
              fill="none"
              stroke="currentColor"
            >
              <rect
                x="1.27335"
                y="1.84659"
                width="14.1818"
                height="14.1818"
                rx="2"
                strokeWidth="1.81818"
              />
              <line
                x1="3.99973"
                y1="5.30007"
                x2="6.90882"
                y2="5.30007"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="9.81809"
                y1="5.30007"
                x2="12.7272"
                y2="5.30007"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="3.99973"
                y1="12.5735"
                x2="6.90882"
                y2="12.5735"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="9.81809"
                y1="12.5735"
                x2="12.7272"
                y2="12.5735"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="3.99973"
                y1="8.93679"
                x2="6.90882"
                y2="8.93679"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="9.81809"
                y1="8.93679"
                x2="12.7272"
                y2="8.93679"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            className={`reader icon ${props.isDoubleReader ? "" : "active"}`}
            onClick={() => props.setIsDoubleReader(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 16"
              fill="none"
            >
              <rect
                x="1.16593"
                y="0.909091"
                width="14.1818"
                height="14.1818"
                rx="2"
                fill="white"
                stroke="white"
                strokeWidth="1.81818"
              />
              <line
                x1="3.89231"
                y1="4.36257"
                x2="12.6196"
                y2="4.36257"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="3.89231"
                y1="11.636"
                x2="12.6196"
                y2="11.636"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
              <line
                x1="3.89231"
                y1="7.99929"
                x2="12.6196"
                y2="7.99929"
                stroke="#1C4480"
                strokeWidth="1.45455"
                strokeLinecap="round"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 17"
              fill="none"
              stroke="currentColor"
            >
              <rect
                x="1.54669"
                y="1.78595"
                width="14.1781"
                height="14.1781"
                rx="2.00409"
                strokeWidth="1.8219"
              />
              <line
                x1="4.27271"
                y1="5.23804"
                x2="12.997"
                y2="5.23804"
                strokeWidth="1.45752"
                strokeLinecap="round"
              />
              <line
                x1="4.27271"
                y1="12.5095"
                x2="12.997"
                y2="12.5095"
                strokeWidth="1.45752"
                strokeLinecap="round"
              />
              <line
                x1="4.27271"
                y1="8.8728"
                x2="12.997"
                y2="8.8728"
                strokeWidth="1.45752"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="zoom-group">
        <div className="zoom icon" onClick={props.onZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 2.0014C12.866 2.0014 16 5.13541 16 9.0014C16 10.5778 15.4789 12.0325 14.5996 13.2026L14.6545 13.2455L14.7071 13.2943L17.7071 16.2943C18.0976 16.6848 18.0976 17.318 17.7071 17.7085C17.3466 18.069 16.7794 18.0967 16.3871 17.7917L16.2929 17.7085L13.2929 14.7085C13.2587 14.6743 13.2275 14.6382 13.1993 14.6006C12.031 15.4803 10.5764 16.0014 9 16.0014C5.13401 16.0014 2 12.8674 2 9.0014C2 5.13541 5.13401 2.0014 9 2.0014ZM8.99986 4.00057C6.23844 4.00057 3.99986 6.23914 3.99986 9.00057C3.99986 11.762 6.23844 14.0006 8.99986 14.0006C11.7613 14.0006 13.9999 11.762 13.9999 9.00057C13.9999 6.23914 11.7613 4.00057 8.99986 4.00057ZM11.0004 8.00029C11.5527 8.00029 12.0004 8.448 12.0004 9.00029C12.0004 9.55257 11.5527 10.0003 11.0004 10.0003H7.00042C6.44813 10.0003 6.00042 9.55257 6.00042 9.00029C6.00042 8.448 6.44813 8.00029 7.00042 8.00029H11.0004Z"
            />
          </svg>
        </div>

        <div className="zoom-container">
          <div
            className="zoom-fill"
            style={{
              width: `${props.zoom}%`,
            }}
          />
          <div
            className="zoom-circle"
            style={{
              left: `${props.zoom}%`,
            }}
          />
        </div>

        <div className="zoom icon" onClick={props.onZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.00098 2.0014C12.867 2.0014 16.001 5.13541 16.001 9.0014C16.001 10.5778 15.4799 12.0325 14.6006 13.2026L14.6555 13.2455L14.7081 13.2943L17.7081 16.2943C18.0986 16.6848 18.0986 17.318 17.7081 17.7085C17.3476 18.069 16.7804 18.0967 16.3881 17.7917L16.2939 17.7085L13.2939 14.7085C13.2597 14.6743 13.2285 14.6382 13.2002 14.6006C12.032 15.4803 10.5774 16.0014 9.00098 16.0014C5.13498 16.0014 2.00098 12.8674 2.00098 9.0014C2.00098 5.13541 5.13498 2.0014 9.00098 2.0014ZM9.00014 4.00057C6.23872 4.00057 4.00014 6.23914 4.00014 9.00057C4.00014 11.762 6.23872 14.0006 9.00014 14.0006C11.7616 14.0006 14.0001 11.762 14.0001 9.00057C14.0001 6.23914 11.7616 4.00057 9.00014 4.00057ZM9.0007 6.00112C9.55298 6.00112 10.0007 6.44884 10.0007 7.00112V8.00112H11.0007C11.553 8.00112 12.0007 8.44884 12.0007 9.00112C12.0007 9.55341 11.553 10.0011 11.0007 10.0011H10.0007V11.0011C10.0007 11.5534 9.55298 12.0011 9.0007 12.0011C8.44841 12.0011 8.0007 11.5534 8.0007 11.0011V10.0011H7.0007C6.44841 10.0011 6.0007 9.55341 6.0007 9.00112C6.0007 8.44884 6.44841 8.00112 7.0007 8.00112H8.0007V7.00112C8.0007 6.44884 8.44841 6.00112 9.0007 6.00112Z"
            />
          </svg>
        </div>
      </div>

      <div className="fullscreen icon" onClick={props.toggleFullscreen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          {props.isFullscreen ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.6001 1.59961C6.01037 1.59961 6.3485 1.90844 6.39472 2.30631L6.4001 2.39961V5.59961C6.4001 6.00988 6.09127 6.34802 5.69339 6.39423L5.6001 6.39961H2.4001C1.95827 6.39961 1.6001 6.04144 1.6001 5.59961C1.6001 5.18934 1.90893 4.8512 2.3068 4.80499L2.4001 4.79961H4.8001V2.39961C4.8001 1.98934 5.10893 1.6512 5.5068 1.60499L5.6001 1.59961ZM5.69339 9.60499L5.6001 9.59961H2.4001L2.3068 9.60499C1.90893 9.6512 1.6001 9.98934 1.6001 10.3996C1.6001 10.8099 1.90893 11.148 2.3068 11.1942L2.4001 11.1996H4.8001V13.5996L4.80548 13.6929C4.84814 14.0602 5.13954 14.3516 5.5068 14.3942L5.6001 14.3996L5.69339 14.3942C6.06066 14.3516 6.35206 14.0602 6.39472 13.6929L6.4001 13.5996V10.3996L6.39472 10.3063C6.35206 9.93905 6.06066 9.64765 5.69339 9.60499ZM14.4001 10.3996C14.4001 9.95778 14.0419 9.59961 13.6001 9.59961H10.4001L10.3068 9.60499C9.90893 9.6512 9.6001 9.98934 9.6001 10.3996V13.5996L9.60548 13.6929C9.65169 14.0908 9.98983 14.3996 10.4001 14.3996L10.4934 14.3942C10.8913 14.348 11.2001 14.0099 11.2001 13.5996V11.1996H13.6001L13.6934 11.1942C14.0913 11.148 14.4001 10.8099 14.4001 10.3996ZM10.4934 1.60499L10.4001 1.59961L10.3068 1.60499C9.93954 1.64765 9.64814 1.93905 9.60548 2.30631L9.6001 2.39961V5.59961L9.60548 5.69291C9.64814 6.06017 9.93954 6.35157 10.3068 6.39423L10.4001 6.39961H13.6001L13.6934 6.39423C14.0913 6.34802 14.4001 6.00988 14.4001 5.59961C14.4001 5.18934 14.0913 4.8512 13.6934 4.80499L13.6001 4.79961H11.2001V2.39961L11.1947 2.30631C11.1521 1.93905 10.8607 1.64765 10.4934 1.60499Z"
            />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.60132 1.60156C6.04315 1.60156 6.40132 1.95973 6.40132 2.40156C6.40132 2.81183 6.09249 3.14997 5.69461 3.19618L5.60132 3.20156H3.20132V5.60156C3.20132 6.01183 2.89249 6.34997 2.49462 6.39618L2.40132 6.40156C1.99105 6.40156 1.65291 6.09273 1.6067 5.69486L1.60132 5.60156V2.40156C1.60132 1.99129 1.91015 1.65316 2.30802 1.60694L2.40132 1.60156H5.60132ZM2.49462 9.60694L2.40132 9.60156L2.30802 9.60694C1.94076 9.6496 1.64936 9.941 1.6067 10.3083L1.60132 10.4016V13.6016L1.6067 13.6949C1.64936 14.0621 1.94076 14.3535 2.30802 14.3962L2.40132 14.4016H5.60132L5.69461 14.3962C6.09249 14.35 6.40132 14.0118 6.40132 13.6016C6.40132 13.1913 6.09249 12.8532 5.69461 12.8069L5.60132 12.8016H3.20132V10.4016L3.19594 10.3083C3.15328 9.941 2.86188 9.6496 2.49462 9.60694ZM14.3959 10.3083C14.3497 9.91039 14.0116 9.60156 13.6013 9.60156L13.508 9.60694C13.1102 9.65316 12.8013 9.99129 12.8013 10.4016V12.8016H10.4013L10.308 12.8069C9.91015 12.8532 9.60132 13.1913 9.60132 13.6016C9.60132 14.0434 9.95949 14.4016 10.4013 14.4016H13.6013L13.6946 14.3962C14.0925 14.35 14.4013 14.0118 14.4013 13.6016V10.4016L14.3959 10.3083ZM13.6946 1.60694L13.6013 1.60156H10.4013L10.308 1.60694C9.91015 1.65316 9.60132 1.99129 9.60132 2.40156C9.60132 2.81183 9.91015 3.14997 10.308 3.19618L10.4013 3.20156H12.8013V5.60156L12.8067 5.69486C12.8494 6.06212 13.1408 6.35352 13.508 6.39618L13.6013 6.40156L13.6946 6.39618C14.0619 6.35352 14.3533 6.06212 14.3959 5.69486L14.4013 5.60156V2.40156L14.3959 2.30827C14.3533 1.941 14.0619 1.6496 13.6946 1.60694Z"
            />
          )}
        </svg>
      </div>
    </div>
  );

  return (
    <section className="title-bar">
      <div className="top">
        <div className="general-container">
          {getLeftControls()}
          <h6 className="issue-title">{props.title}</h6>
          {getRightControls()}
        </div>
      </div>

      <div className="bottom">
        <div className="general-container">
          {getLeftControls()}
          {getRightControls()}
        </div>
      </div>
    </section>
  );
}

export default TitleBar;
