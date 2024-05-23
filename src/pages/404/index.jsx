import IssueCard from "../../components/issue-card";
import "./index.css";

function Page404() {
  return (
    <div id="page-404" className="general-container">
      <p className="subheader">Error 404</p>
      <h2>Page not found.</h2>
      <hr />

      <p className="text">
        Try searching for it again. It may have been removed or there might have
        been a typo in the URL.
      </p>

      <p className="subheader">Our latest releases</p>
      <h4>You might be interested in these instead.</h4>

      <div className="card-grid">
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </div>
    </div>
  );
}

export default Page404;
