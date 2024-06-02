import { useLocation } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";

function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query");

  const [isGridView, setIsGridView] = useState(true);
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState(null);
  const [sortOldestFilter, setSortOldestFilter] = useState(null);
  const [activeFilterPopup, setActiveFilterPopup] = useState(null);

  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(
      fetchIssues({
        search: query,
        page: page,
        order: sortOldestFilter ? "asc" : "desc",
      })
    );
  }, [query, page, yearFilter, sortOldestFilter]);

  const getKey = () => `${sortOldestFilter === true ? "asc-" : ""}${page}`;

  return (
    <div id="search-results" className="general-container general-padding-top">
      <p className="subheader">
        {issues.data.search != null && issues.data.search.found == 0
          ? `We couldn't find any matches for`
          : `${
              issues.data.search == null
                ? "Loading"
                : "Showing " + issues.data.search.found
            } results for`}
      </p>
      <h2>{`“${query}”`}</h2>
      <hr />

      {issues.data.search != null && issues.data.search.found == 0 ? (
        <ul>
          <li>Double-check the spelling or try using different keywords.</li>
          <li>Broaden your search query to include more general terms.</li>
          <li>
            Try refining your search with specific filters to narrow down the
            results.
          </li>
        </ul>
      ) : (
        <>
          FILTERS
          <div className={`card-grid ${isGridView ? "" : "list"}`}>
            {issues.data.search != null &&
              issues.data.search[getKey()] != null &&
              issues.data.search[getKey()].map((issue, idx) => (
                <IssueCard key={`issue-${idx}`} data={issue} />
              ))}
          </div>
          PAGINATION
        </>
      )}
    </div>
  );
}

export default SearchPage;
