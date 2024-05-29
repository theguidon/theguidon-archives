import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import chevronRight from "./../../assets/icons/chevron-right.svg";
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
        <p className="subheader">{`${year}–${year + 1}`}</p>
        <Link to="releases/this-term" className="row">
          <h3>Releases this term</h3>
          <img src={chevronRight} />
        </Link>
        <hr />
        <div id="this-term" className="card-grid">
          {issues.data.all != null &&
            issues.data.all[0] != null &&
            [...Array(5)].map((_, idx) => (
              <IssueCard
                data={issues.data.all[0].issues[idx]}
                key={`this-term-${idx}`}
              />
            ))}
        </div>

        <p className="subheader">Browse</p>
        <Link to="/releases/recent" className="row">
          <h3>The Archive</h3>
          <img src={chevronRight} />
        </Link>
        <hr />
        <div id="recently-uploaded" className="card-grid">
          {categories.map((categ, idx) => (
            <Link to={categ.link} key={`categ-${idx}`} className="categ-card">
              <div className="row">
                <h5>{categ.title}</h5>
                <img src={chevronRight} />
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

        <p className="subheader">Recently Uploaded</p>
        <h3>New on the Archive</h3>
        <hr />
        <div id="browse" className="card-grid">
          <IssueCard data={sample} />
          <IssueCard data={sample} />
          <IssueCard data={sample} />
          <IssueCard data={sample} />
          <IssueCard data={sample} />
        </div>

        <p className="subheader">Explore</p>
        <Link to="/releases" className="row">
          <h3>History</h3>
          <img src={chevronRight} />
        </Link>
        <hr />
        <div id="history" className="card-grid">
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
