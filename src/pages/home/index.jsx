import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import chevronRight from "./../../assets/icons/chevron-right.svg";
import { Link } from "react-router-dom";

function HomePage() {
  const year = 2023;

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
      <div id="hero"></div>
      <main className="general-container">
        <p className="subheader">{`${year}–${year + 1}`}</p>
        <Link to="releases/this-term" className="row">
          <h3>Releases this term</h3>
          <img src={chevronRight} />
        </Link>
        <hr />
        <div id="this-term" className="card-grid">
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>

        <p className="subheader">Browse</p>
        <h3>The Archive</h3>
        <hr />
        <div id="browse" className="card-grid">
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
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
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
