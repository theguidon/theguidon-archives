import { useLocation } from "react-router-dom";
import "./index.css";
import "./filters.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";
import Pagination from "../../components/pagination";
import { calculatePageNums } from "../../utils";
import ViewsFilterGroup from "../../components/filters/views";
import AdvancedFiltersGroup from "../../components/filters/advanced";
import { setDocumentTitle } from "../../utils";

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

  useEffect(() => {
    setDocumentTitle(`Search results for ${query}`);
  }, [query]);

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
          <div className="filters">
            <AdvancedFiltersGroup
              activeFilterPopup={activeFilterPopup}
              setActiveFilterPopup={setActiveFilterPopup}
              yearFilter={yearFilter}
              setYearFilter={setYearFilter}
              sortOldestFilter={sortOldestFilter}
              setSortOldestFilter={setSortOldestFilter}
            />

            <ViewsFilterGroup
              isGridView={isGridView}
              setIsGridView={setIsGridView}
            />
          </div>

          <div className={`card-grid ${isGridView ? "" : "list"}`}>
            {issues.data.search != null &&
              issues.data.search[getKey()] != null &&
              issues.data.search[getKey()].map((issue, idx) => (
                <IssueCard key={`issue-${idx}`} data={issue} />
              ))}
          </div>
          {calculatePageNums(issues.data.search, page).length > 1 && (
            <Pagination
              pageNums={calculatePageNums(issues.data.search, page)}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;
