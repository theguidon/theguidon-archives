import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DateFormatter } from "../../utils";
import { useEffect } from "react";
import { fetchIssues } from "../../redux/modules/issues";
import { setDocumentTitle } from "../../utils";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIssues({}));
    dispatch(fetchIssues({ categ: "press-issue" }));
    dispatch(fetchIssues({ categ: "graduation-magazine" }));
    dispatch(fetchIssues({ categ: "freshmanual" }));
    dispatch(fetchIssues({ categ: "uaap-primer" }));
    dispatch(fetchIssues({ categ: "legacy" }));
    dispatch(fetchIssues({ categ: "other" }));

    setDocumentTitle("");
  }, []);

  const issues = useSelector((state) => state.issues);
  const year = 2023;

  const sample = {
    cover: img,
    slug: "novdec-2022",
    title: "November–December 2022",
    date_published: "31 December 2022",
    blurb:
      "With 2022 nearing its end, The GUIDON takes a look at the events, issues, and developments that have come to define the past year.",
  };

  const categories = [
    {
      key: "press-issue",
      link: "/releases/press",
      title: "Press Issues",
    },
    {
      key: "graduation-magazine",
      link: "/releases/gradmag",
      title: "Graduation Magazines",
    },
    {
      key: "freshmanual",
      link: "/releases/freshmanual",
      title: "Freshmanuals",
    },
    {
      key: "uaap-primer",
      link: "/releases/uaap-primer",
      title: "UAAP Primers",
    },
    {
      key: "other",
      link: "/releases/others",
      title: "Others",
    },
  ];

  const chevronRight = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
      <path
        d="M14.5786 26.8126C13.9635 27.369 13.9146 28.32 14.4695 28.9367C15.0244 29.5535 15.9729 29.6025 16.588 29.0461L25.4248 21.0541C26.0867 20.4554 26.0849 19.4134 25.4209 18.8171L16.6613 10.9504C16.0442 10.3962 15.0959 10.4485 14.5432 11.0672C13.9904 11.6859 14.0426 12.6367 14.6597 13.1909L21.846 19.6447C22.0226 19.8033 22.0231 20.0798 21.8471 20.239L14.5786 26.8126Z"
        fill="#1C4480"
      />
    </svg>
  );

  return (
    <div id="home">
      {issues.data.all != null &&
      issues.data.all[1] != null &&
      issues.data.all[1].length >= 1 ? (
        <div
          id="hero"
          style={{
            backgroundImage: `url(${issues.data.all[1][0].cover_full})`,
          }}
        >
          <div className="bg-tint" />

          <div className="general-container">
            <div className="info">
              <p className="badge">Latest Release</p>
              <h1 className="title">{issues.data.all[1][0].title}</h1>
              <p className="date">
                {DateFormatter(issues.data.all[1][0].date_published)}
              </p>
              <p className="desc">{issues.data.all[1][0].description}</p>

              <Link
                to={`/issue/${issues.data.all[1][0].fixed_slug}`}
                className="read-now"
              >
                Read now
              </Link>
            </div>

            <img
              className="cover"
              src={issues.data.all[1][0].cover}
              alt={issues.data.all[1][0].title}
            />
          </div>
        </div>
      ) : (
        <div id="hero" className="loading-container">
          <div className="bg-tint" />

          <div className="general-container">
            <div className="info">
              <div className="badge loading" />
              <div className="title loading" />
              <div className="date loading" />
              <div
                className="desc loading"
                style={{ width: `${Math.random() * 50 + 50}%` }}
              />
              <div className="read-now loading" />
            </div>

            <div className="cover loading" />
          </div>
        </div>
      )}

      <main className="general-container general-padding-top">
        <p className="subheader">Recently Uploaded</p>
        <Link to="releases/recent" className="row">
          <h3>New on the Archive</h3>
          {chevronRight}
        </Link>
        <hr />
        <div id="latest" className="card-grid mobile-list">
          {issues.data.all != null && issues.data.all[1] != null
            ? [...Array(Math.min(5, issues.data.all[1].length))].map(
                (_, idx) => (
                  <IssueCard
                    issue={issues.data.all[1][idx]}
                    key={`recent-${idx}`}
                  />
                )
              )
            : [...Array(5)].map((_, idx) => (
                <IssueCard loading={true} key={`recent-loading-${idx}`} />
              ))}
        </div>

        <p className="subheader">Browse</p>
        <Link to="/releases/recent" className="row">
          <h3>The Archive</h3>
          {chevronRight}
        </Link>
        <hr />
        <div id="recently-uploaded" className="card-grid mobile-list">
          {categories.map((categ, idx) => (
            <Link to={categ.link} key={`categ-${idx}`} className="categ-card">
              <div className="row">
                <h5 className="categ-name">{categ.title}</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M8.7472 16.5876C8.37811 16.9214 8.3488 17.492 8.68173 17.862C9.01466 18.2321 9.58376 18.2615 9.95284 17.9277L15.2549 13.1324C15.6521 12.7732 15.651 12.1481 15.2525 11.7902L9.99678 7.07022C9.62653 6.73771 9.05755 6.7691 8.72591 7.14032C8.39428 7.51154 8.42558 8.08202 8.79582 8.41453L12.9755 12.1682C13.1521 12.3268 13.1526 12.6033 12.9766 12.7625L8.7472 16.5876Z"
                    fill="#1C4480"
                  />
                </svg>
              </div>
              {issues.data[categ.key] != null &&
              issues.data[categ.key][1] != null &&
              true ? (
                <div className="cover-container">
                  {[
                    ...Array(Math.min(3, issues.data[categ.key][1].length)),
                  ].map((issue, idx2) => (
                    <img
                      className="cover"
                      src={issues.data[categ.key][1][idx2].cover}
                      alt={categ.title}
                      key={`categ-${idx}-loading-${idx2}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="cover-container loading" />
              )}
            </Link>
          ))}
        </div>

        <p className="subheader">The GUIDON Through the Years</p>
        <Link to="/releases/legacy" className="row">
          <h3>Explore History</h3>
          {chevronRight}
        </Link>
        <hr />
        <div id="history" className="card-grid mobile-list">
          {issues.data.legacy != null && issues.data.legacy[1] != null
            ? [...Array(Math.min(5, issues.data.legacy[1].length))].map(
                (_, idx) => (
                  <IssueCard
                    issue={issues.data.legacy[1][idx]}
                    key={`history-${idx}`}
                  />
                )
              )
            : [...Array(5)].map((_, idx) => (
                <IssueCard loading={true} key={`history-loading-${idx}`} />
              ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
