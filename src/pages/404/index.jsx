import IssueCard from "../../components/issue-card";
import "./index.css";

import img from "./../../assets/images/broadsheet-sample.png";

function Page404() {
  const data = {
    cover: img,
    slug: "aprmay-2024",
    title: "April–May 2024",
    date: "23 May 2024",
    blurb:
      "With 2022 nearing its end, The GUIDON takes a look at the events, issues, and developments that have come to define the past year.",
  };

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

      <div className="card-grid mobile-list">
        <IssueCard data={data} />
        <IssueCard data={data} />
        <IssueCard data={data} />
        <IssueCard data={data} />
        <IssueCard data={data} />
      </div>
    </div>
  );
}

export default Page404;
