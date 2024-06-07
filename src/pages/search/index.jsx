import { useSearchParams } from "react-router-dom";
import "./index.css";
import "./filters.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";
import Pagination from "../../components/pagination";
import {
  calculatePageNums,
  validatePage,
  validateSortFilter,
  validateView,
  validateYearFilter,
} from "../../utils";
import { setDocumentTitle } from "../../utils";
import FiltersGroup from "../../components/filters";
import { fetchMinmaxYears } from "../../redux/modules/minmax-years";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);
  const minmaxYears = useSelector((state) => state.minmaxYears);

  const page = validatePage(searchParams.get("page"));
  const yearFilter = validateYearFilter(
    searchParams.get("year"),
    minmaxYears.min,
    minmaxYears.max
  );
  const sortOldestFilter = validateSortFilter(searchParams.get("sort"));
  const isGridView = validateView(searchParams.get("view"));

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

  useEffect(() => {
    dispatch(fetchMinmaxYears());

    let defsp = searchParams;

    if (searchParams.get("page") == null) defsp.set("page", "1");
    if (searchParams.get("sort") == null) defsp.set("sort", "newest");
    if (searchParams.get("view") == null) defsp.set("view", "grid");

    setSearchParams(defsp);
  }, []);

  const getKey = () => `${sortOldestFilter === true ? "asc-" : ""}${page}`;

  /**
   * Replaces in search params
   * @param {object[]} newParams Array of params to be updated { key, value, delete? }
   */
  const replaceSearchParams = (newParams) => {
    let nsp = searchParams;

    newParams.forEach((pair) => {
      if (pair.delete == null) nsp.set(pair.key, pair.value);
      else nsp.delete(pair.key);
    });

    setSearchParams(nsp);
  };

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
          <FiltersGroup
            hideCategories={true}
            replaceSearchParams={replaceSearchParams}
          />

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
              replaceSearchParams={replaceSearchParams}
            />
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;
