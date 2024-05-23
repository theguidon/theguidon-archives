import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";
import chevronRight from "./../../assets/icons/chevron-right.svg";

function HomePage() {
  const year = 2023;

  const categories = [
    {
      link: "/releases/press",
      name: "Press Issues",
      img: img,
    },
    {
      link: "/releases/gradmag",
      name: "Graduation Magazines",
      img: img,
    },
    {
      link: "/releases/freshmanual",
      name: "Freshmanuals",
      img: img,
    },
    {
      link: "/releases/uaap-primer",
      name: "UAAP Primers",
      img: img,
    },
    {
      link: "/releases/others",
      name: "Others",
      img: img,
    },
  ];

  return (
    <div id="home">
      <div id="hero"></div>
      <main className="general-container">
        <p className="subheader">{`${year}–${year + 1}`}</p>
        <div className="row">
          <h3>Releases this term</h3>
          <img src={chevronRight} />
        </div>
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
        <div className="row">
          <h3>New on the Archive</h3>
          <img src={chevronRight} />
        </div>
        <hr />
        <div id="recently-uploaded" className="card-grid">
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>

        <p className="subheader">Explore</p>
        <div className="row">
          <h3>History</h3>
          <img src={chevronRight} />
        </div>
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
