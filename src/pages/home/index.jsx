import IssueCard from "../../components/issue-card";
import "./index.css";

function HomePage() {
  return (
    <div id="home">
      <div id="hero"></div>
      <main className="general-container">
        <div className="card-grid">
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>

        <div className="card-grid.list">
          <IssueCard isList={true} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
