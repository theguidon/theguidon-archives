import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DateFormatter } from "../../utils/date-formatter";
import { useEffect } from "react";
import { fetchIssues } from "../../redux/modules/issues";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIssues({}));
    dispatch(fetchIssues({ categ: "press-issue" }));
    dispatch(fetchIssues({ categ: "graduation-magazine" }));
    dispatch(fetchIssues({ categ: "freshmanual" }));
    dispatch(fetchIssues({ categ: "uaap-primer" }));
    dispatch(fetchIssues({ categ: "other" }));
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
      {issues.data.all != null && issues.data.all[0] != null && (
        <div
          id="hero"
          style={{
            backgroundImage: `url(${issues.data.all[0].issues[0].cover})`,
          }}
        >
          <div className="bg-tint" />

          <div className="general-container">
            <div className="info">
              <p className="badge">Latest Release</p>
              <h1 className="title">{issues.data.all[0].issues[0].title}</h1>
              <p className="date">
                {DateFormatter(issues.data.all[0].issues[0].date_published)}
              </p>
              <p className="desc">{issues.data.all[0].issues[0].description}</p>

              <Link
                to={`/issue/${issues.data.all[0].issues[0].fixed_slug}`}
                className="read-now"
              >
                Read now
              </Link>
            </div>

            <img
              className="cover"
              src={issues.data.all[0].issues[0].cover}
              alt={issues.data.all[0].issues[0].title}
            />
          </div>
        </div>
      )}

      <main className="general-container">
        <p className="subheader">Recently Uploaded</p>
        <Link to="releases/recent" className="row">
          <h3>New on the Archive</h3>
          {chevronRight}
        </Link>
        <hr />
        <div id="latest" className="card-grid mobile-list">
          {issues.data.all != null &&
            issues.data.all[0] != null &&
            [...Array(5)].map((_, idx) => (
              <IssueCard
                data={issues.data.all[0].issues[idx]}
                key={`recent-${idx}`}
              />
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
                <h5>{categ.title}</h5>
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
              <hr />
              <div className="cover-container">
                {issues.data[categ.key] != null &&
                  issues.data[categ.key][0] != null &&
                  issues.data[categ.key][0].issues[0] != null && (
                    <img
                      src={issues.data[categ.key][0].issues[0].cover}
                      alt={categ.title}
                    />
                  )}
              </div>
            </Link>
          ))}
        </div>

        <p className="subheader">Explore</p>
        <Link to="/releases" className="row">
          <h3>History</h3>
          {chevronRight}
        </Link>
        <hr />
        <div id="history" className="card-grid mobile-list">
          <IssueCard data={sample} />
          <IssueCard data={sample} />
          <IssueCard data={sample} />
          <IssueCard data={sample} />
          <IssueCard data={sample} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
