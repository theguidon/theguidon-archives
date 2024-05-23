import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import chevronRight from "./../../assets/icons/chevron-right.svg";
import { Link } from "react-router-dom";

function HomePage() {
  const year = 2023;

  const latest = {
    cover: img,
    slug: "aprmay-2024",
    title: "April–May 2024",
    date: "23 May 2024",
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
      <div
        id="hero"
        style={{
          background: `linear-gradient(180deg, #1C4480 0%, rgba(0, 0, 0, 0) 175%), url(${latest.cover})`,
        }}
      >
        <div className="general-container">
          <div className="info">
            <p className="badge">Latest Release</p>
            <h1 className="title">{latest.title}</h1>
            <p className="date">{latest.date}</p>
            <p className="blurb">{latest.blurb}</p>

            <Link to={`/issue/${latest.slug}`} className="read-now">
              Read now
            </Link>
          </div>

          <img className="cover" src={latest.cover} alt={latest.title} />
        </div>
      </div>

      <main className="general-container">
        <p className="subheader">{`${year}–${year + 1}`}</p>
        <Link to="releases/this-term" className="row">
          <h3>Releases this term</h3>
          <img src={chevronRight} />
        </Link>
        <hr />
        <div id="this-term" className="card-grid">
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
        </div>

        <p className="subheader">Browse</p>
        <h3>The Archive</h3>
        <hr />
        <div id="browse" className="card-grid">
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
        </div>

        <p className="subheader">Recently Uploaded</p>
        <Link to="/releases/recent" className="row">
          <h3>New on the Archive</h3>
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

        <p className="subheader">Explore</p>
        <Link to="/releases" className="row">
          <h3>History</h3>
          <img src={chevronRight} />
        </Link>
        <hr />
        <div id="history" className="card-grid">
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
          <IssueCard data={latest} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
