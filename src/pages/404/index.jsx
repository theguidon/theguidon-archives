import IssueCard from "../../components/issue-card";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssues } from "../../redux/modules/issues";
import { setDocumentTitle } from "../../utils";

function Page404() {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(fetchIssues({}));

    setDocumentTitle("Page not found");
  }, []);

  return (
    <div id="page-404" className="general-container general-padding-top">
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
        {issues.data.all != null &&
          issues.data.all[1] != null &&
          [...Array(Math.min(5, issues.data.all[1].length))].map((_, idx) => (
            <IssueCard issue={issues.data.all[1][idx]} key={`issue-${idx}`} />
          ))}
      </div>
    </div>
  );
}

export default Page404;
