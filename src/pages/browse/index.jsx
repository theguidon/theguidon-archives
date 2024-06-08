import { useParams, Navigate, useSearchParams } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchMinmaxYears } from "../../redux/modules/minmax-years";
import FiltersGroup from "../../components/filters";

function BrowsePage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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
    dispatch(fetchMinmaxYears());

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
        })
      );
    else
      dispatch(
        fetchIssues({
          categ: actual[slug],
          page: page,
          order: sortOldestFilter ? "asc" : "desc",
          year: yearFilter,
        })
      );
  }, [slug, page, yearFilter, sortOldestFilter]);

  /**
   * Used in mapping issues based on categ or date filters
   * @returns string
   */
  const getCategKey = () => (yearFilter != null ? "filtered" : actual[slug]);

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
  }, [slug, searchParams]);

  /**
   * If path is /releases, redirect to /releases/recent
   */
  if (slug == null) return <Navigate to="/releases/recent" />;

  return (
    <div id="browse" className="general-container general-padding-top">
      <p className="subheader">
        {slug == null || slug === "recent" ? "Recently Uploaded" : "Browse"}
      </p>
      <h2>
        {slug == null || slug === "recent"
          ? "What's New on the Archive"
          : "The Archive"}
      </h2>

      <hr />
      <FiltersGroup replaceSearchParams={replaceSearchParams} />

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
    </div>
  );
}

export default BrowsePage;
