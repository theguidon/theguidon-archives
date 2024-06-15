import { useSearchParams } from "react-router-dom";
import "./index.css";
import "./filters.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";
import Pagination from "../../components/pagination";
import {
  calculatePageNums,
  validatePage,
  validateRangeFilter,
  validateSortFilter,
  validateView,
  validateYearFilter,
} from "../../utils";
import { setDocumentTitle } from "../../utils";
import FiltersGroup from "../../components/filters";
import { fetchMinmaxDates } from "../../redux/modules/minmax-dates";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);
  const minmaxDates = useSelector((state) => state.minmaxDates);

  const page = validatePage(searchParams.get("page"));
  const yearFilter = validateYearFilter(
    searchParams.get("year"),
    minmaxDates.min.year,
    minmaxDates.max.year
  );
  const [rangeFilter, setRangeFilter] = useState({
    from: null,
    until: null,
  });
  const sortOldestFilter = validateSortFilter(searchParams.get("sort"));
  const isGridView = validateView(searchParams.get("view"));

  const topRef = useRef(null);

  /**
   * Fetch data on filter or query update
   */
  useEffect(() => {
    let is_volume =
      (query == null ? "" : query).match(/^(volume|vol|vol\.) [0-9]+/gi) !=
      null;

    dispatch(
      fetchIssues({
        search: query,
        page: page,
        order: sortOldestFilter ? "asc" : "desc",
        year: yearFilter,
        from: rangeFilter.from,
        until: rangeFilter.until,
        volume: is_volume ? parseInt(query.split(" ")[1]) : null,
      })
    );
  }, [
    query,
    page,
    yearFilter,
    rangeFilter.from,
    rangeFilter.until,
    sortOldestFilter,
  ]);

  /**
   * Change document title on query change
   */
  useEffect(() => {
    setDocumentTitle(`Search results for ${query}`);

    setRangeFilter({
      from: validateRangeFilter(searchParams.get("from"), "from"),
      until: validateRangeFilter(searchParams.get("until"), "until"),
    });
  }, [query, searchParams]);

  /**
   * Fetch data
   * Add default page, sort, and view filters
   */
  useEffect(() => {
    dispatch(fetchMinmaxDates());

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
  const getCategKey = () =>
    yearFilter != null || rangeFilter.from != null || rangeFilter.until != null
      ? "filtered"
      : "search";

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

  useEffect(() => {
    if (topRef != null && topRef.current != null) {
      window.scrollTo({
        top:
          topRef.current.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }
  }, [page]);

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
      <h2 ref={topRef}>{`“${query}”`}</h2>
      <hr />

      <FiltersGroup
        hideCategories={true}
        replaceSearchParams={replaceSearchParams}
      />

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
          <div className={`card-grid ${isGridView ? "" : "list"}`}>
            {issues.data[getCategKey()] != null &&
            issues.data[getCategKey()][getKey()] != null
              ? issues.data[getCategKey()][getKey()].map((issue, idx) => (
                  <IssueCard
                    key={`issue-${issue.fixed_slug}`}
                    issue={issue}
                    query={query}
                  />
                ))
              : [...Array(20)].map((_, idx) => (
                  <IssueCard loading={true} key={`issue-loading-${idx}`} />
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
