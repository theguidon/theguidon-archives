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

  /**
   * Fetch data on filter or query update
   */
  useEffect(() => {
    dispatch(
      fetchIssues({
        search: query,
        page: page,
        order: sortOldestFilter ? "asc" : "desc",
        year: yearFilter,
      })
    );
  }, [query, page, yearFilter, sortOldestFilter]);

  /**
   * Change document title on query change
   */
  useEffect(() => {
    setDocumentTitle(`Search results for ${query}`);
  }, [query]);

  /**
   * Fetch data
   * Add default page, sort, and view filters
   */
  useEffect(() => {
    dispatch(fetchMinmaxYears());

    let defsp = searchParams;

    if (searchParams.get("page") == null) defsp.set("page", "1");
    if (searchParams.get("sort") == null) defsp.set("sort", "newest");
    if (searchParams.get("view") == null) defsp.set("view", "grid");

    setSearchParams(defsp);
  }, []);

  /**
   * Used in mapping issues based on categ or date filters
   * @returns string
   */
  const getCategKey = () => (yearFilter != null ? "filtered" : "search");

  /**
   * Used in mapping issues based on sort
   * @returns string
   */
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
        {issues.data[getCategKey()] != null &&
        issues.data[getCategKey()].found == 0
          ? `We couldn't find any matches for`
          : `${
              issues.data[getCategKey()] == null
                ? "Loading"
                : "Showing " + issues.data[getCategKey()].found
            } results for`}
      </p>
      <h2>{`“${query}”`}</h2>
      <hr />

      {issues.data[getCategKey()] != null &&
      issues.data[getCategKey()].found == 0 ? (
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
            {issues.data[getCategKey()] != null &&
              issues.data[getCategKey()][getKey()] != null &&
              issues.data[getCategKey()][getKey()].map((issue, idx) => (
                <IssueCard key={`issue-${issue.fixed_slug}`} issue={issue} />
              ))}
          </div>
          {calculatePageNums(issues.data[getCategKey()], page).length > 1 && (
            <Pagination
              pageNums={calculatePageNums(issues.data[getCategKey()], page)}
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
