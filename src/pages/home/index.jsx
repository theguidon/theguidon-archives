import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import chevronRight from "./../../assets/icons/chevron-right.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DateFormatter } from "../../utils/date-formatter";

function HomePage() {
  const year = 2023;

  const issues = useSelector((state) => state.issues);

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
      link: "/releases/press",
      title: "Press Issues",
      img: img,
    },
    {
      link: "/releases/gradmag",
      title: "Graduation Magazines",
      img: img,
    },
    {
      link: "/releases/freshmanual",
      title: "Freshmanuals",
      img: img,
    },
    {
      link: "/releases/uaap-primer",
      title: "UAAP Primers",
      img: img,
    },
    {
      link: "/releases/others",
      title: "Others",
      img: img,
    },
  ];

  return (
    <div id="home">
      {issues.isReady && (
        <div
          id="hero"
          style={{
            background: `linear-gradient(180deg, #1C4480 0%, rgba(0, 0, 0, 0) 175%), url(${issues.data[0].cover})`,
          }}
        >
          <div className="general-container">
            <div className="info">
              <p className="badge">Latest Release</p>
              <h1 className="title">{issues.data[0].title}</h1>
              <p className="date">
                {DateFormatter(issues.data[0].date_published)}
              </p>
              <p className="blurb">{issues.data[0].description}</p>

              <Link
                to={`/issue/${issues.data[0].fixed_slug}`}
                className="read-now"
              >
                Read now
              </Link>
            </div>

            <img
              className="cover"
              src={issues.data[0].cover}
              alt={issues.data[0].title}
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
          {issues.isReady &&
            [...Array(5)].map((_, idx) => (
              <IssueCard data={issues.data[idx]} key={`this-term-${idx}`} />
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
                <img src={categ.img} alt={categ.title} />
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
