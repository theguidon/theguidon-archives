import { useParams, Navigate, useSearchParams } from "react-router-dom";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchMinmaxDates } from "../../redux/modules/minmax-dates";
import FiltersGroup from "../../components/filters";

function BrowsePage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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
  // const rangeFilter = {
  //   from: validateRangeFilter(searchParams.get("from"), "from"),
  //   until: validateRangeFilter(searchParams.get("until"), "until"),
  // };
  const sortOldestFilter = validateSortFilter(searchParams.get("sort"));
  const isGridView = validateView(searchParams.get("view"));

  const topRef = useRef(null);

  const actual = {
    recent: "all",
    press: "press-issue",
    gradmag: "graduation-magazine",
    freshmanual: "freshmanual",
    "uaap-primer": "uaap-primer",
    legacy: "legacy",
    others: "other",
  };

  const titles = {
    recent: "Recently Uploaded",
    press: "Press Issues",
    gradmag: "Graduation Magazines",
    freshmanual: "Freshmanuals",
    "uaap-primer": "UAAP Primers",
    legacy: "Over the Years",
    others: "Others",
  };

  /**
   * Fetch data
   * Add default page, sort, and view filters
   */
  useEffect(() => {
    dispatch(fetchMinmaxDates());

    dispatch(fetchIssues({}));
    dispatch(fetchIssues({ categ: "press-issue" }));
    dispatch(fetchIssues({ categ: "graduation-magazine" }));
    dispatch(fetchIssues({ categ: "freshmanual" }));
    dispatch(fetchIssues({ categ: "uaap-primer" }));
    dispatch(fetchIssues({ categ: "legacy" }));
    dispatch(fetchIssues({ categ: "other" }));

    let defsp = searchParams;

    if (searchParams.get("page") == null) defsp.set("page", "1");
    if (searchParams.get("sort") == null) defsp.set("sort", "newest");
    if (searchParams.get("view") == null) defsp.set("view", "grid");

    if (slug != null) setSearchParams(defsp);
  }, []);

  /**
   * Fetch data on filter, slug, or page update
   */
  useEffect(() => {
    if (slug == "recent")
      dispatch(
        fetchIssues({
          page: page,
          order: sortOldestFilter ? "asc" : "desc",
          year: yearFilter,
          from: rangeFilter.from,
          until: rangeFilter.until,
        })
      );
    else
      dispatch(
        fetchIssues({
          categ: actual[slug],
          page: page,
          order: sortOldestFilter ? "asc" : "desc",
          year: yearFilter,
          from: rangeFilter.from,
          until: rangeFilter.until,
        })
      );
  }, [
    slug,
    page,
    yearFilter,
    rangeFilter.from,
    rangeFilter.until,
    sortOldestFilter,
  ]);

  /**
   * Used in mapping issues based on categ or date filters
   * @returns string
   */
  const getCategKey = () =>
    yearFilter != null || rangeFilter.from != null || rangeFilter.until != null
      ? "filtered"
      : actual[slug];

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

    if (slug != null) setSearchParams(nsp);
  };

  /**
   * Update document title
   */
  useEffect(() => {
    if (titles[slug] != null) setDocumentTitle(titles[slug]);

    setRangeFilter({
      from: validateRangeFilter(searchParams.get("from"), "from"),
      until: validateRangeFilter(searchParams.get("until"), "until"),
    });
  }, [slug, searchParams]);

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

  useEffect(() => {
    replaceSearchParams([{ key: "page", value: 1 }]);
  }, [yearFilter, rangeFilter.from, rangeFilter.until]);

  /**
   * If path is /releases, redirect to /releases/recent
   */
  if (slug == null) return <Navigate to="/releases/recent" />;

  return (
    <div id="browse" className="general-container general-padding-top">
      <p className="subheader">
        {slug == null || slug === "recent" ? "Recently Uploaded" : "Browse"}
      </p>
      <h2 ref={topRef}>
        {slug == null || slug === "recent"
          ? "What's New on the Archive"
          : "The Archive"}
      </h2>

      <hr />
      <FiltersGroup replaceSearchParams={replaceSearchParams} />

      <div className={`card-grid ${isGridView ? "" : "list"}`}>
        {issues.data[getCategKey()] != null &&
        issues.data[getCategKey()][getKey()] != null
          ? issues.data[getCategKey()][getKey()].map((issue, idx) => (
              <IssueCard key={`issue-${issue.fixed_slug}`} issue={issue} />
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
    </div>
  );
}

export default BrowsePage;
