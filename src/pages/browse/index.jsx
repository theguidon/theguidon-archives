import { useParams, Navigate, useSearchParams } from "react-router-dom";
import "./index.css";
import "./filters.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";
import Pagination from "../../components/pagination";
import { calculatePageNums } from "../../utils";
import ViewsFilterGroup from "../../components/filters/views";
import CategoriesFilterGroup from "../../components/filters/categories";
import AdvancedFiltersGroup from "../../components/filters/advanced";
import { setDocumentTitle } from "../../utils";
import { fetchMinmaxYears } from "../../redux/modules/minmax-years";

function BrowsePage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);
  const minmaxYears = useSelector((state) => state.minmaxYears);

  const [page, setPage] = useState(
    searchParams.get("page") != null &&
      !isNaN(searchParams.get("page")) &&
      parseInt(searchParams.get("page")) >= 1
      ? parseInt(searchParams.get("page"))
      : 1
  );
  const [yearFilter, setYearFilter] = useState(
    searchParams.get("year") != null &&
      !isNaN(searchParams.get("year")) &&
      parseInt(searchParams.get("year")) >= minmaxYears.min &&
      parseInt(searchParams.get("year")) <= minmaxYears.max
      ? parseInt(searchParams.get("year"))
      : null
  );
  const [sortOldestFilter, setSortOldestFilter] = useState(
    searchParams.get("sort") != "oldest"
  );
  const [isGridView, setIsGridView] = useState(
    searchParams.get("view") != "list"
  );
  const [activeFilterPopup, setActiveFilterPopup] = useState(null);

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
        fetchIssues({ page: page, order: sortOldestFilter ? "asc" : "desc" })
      );
    else
      dispatch(
        fetchIssues({
          categ: actual[slug],
          page: page,
          order: sortOldestFilter ? "asc" : "desc",
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

  useEffect(() => {
    if (titles[slug] != null) setDocumentTitle(titles[slug]);

    if (slug != null) {
      let toReplace = [];

      // page
      let page = searchParams.get("page");
      if (!isNaN(page)) {
        let intpage = parseInt(page);

        if (intpage >= 1) {
          if (parseFloat(page) % 1 == 0) setPage(intpage);
          else toReplace.push({ key: "page", value: intpage });
        } else toReplace.push({ key: "page", value: 1 });
      } else toReplace.push({ key: "page", value: 1 });

      // year
      let year = searchParams.get("year");
      if (!isNaN(year)) {
        let intyear = parseInt(year);

        if (intyear >= minmaxYears.min && intyear <= minmaxYears.max) {
          if (parseFloat(year) % 1 == 0) setYearFilter(intyear);
          else toReplace.push({ key: "year", value: intyear });
        } else {
          toReplace.push({ key: "year", delete: true });
          setYearFilter(null);
        }
      } else {
        toReplace.push({ key: "year", delete: true });
        setYearFilter(null);
      }

      // sort
      let sort = searchParams.get("sort");
      setSortOldestFilter(sort != "newest");
      if (sort != "newest" && sort != "oldest")
        toReplace.push({ key: "sort", value: "newest" });

      // view
      let view = searchParams.get("view");
      setIsGridView(view != "list");
      if (view != "grid" && view != "list")
        toReplace.push({ key: "view", value: "grid" });

      replaceSearchParams(toReplace);
    }
  }, [slug, searchParams]);

  /**
   * Remove yearFilter if out of bounds
   */
  useEffect(() => {
    if (minmaxYears.isUpdated) {
      if (yearFilter < minmaxYears.min || yearFilter > minmaxYears.max)
        replaceSearchParams([{ key: "year", delete: true }]);
    }
  }, [minmaxYears]);

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

      <div className="filters">
        <CategoriesFilterGroup searchParams={searchParams} />

        <div className="advanced-group">
          <AdvancedFiltersGroup
            activeFilterPopup={activeFilterPopup}
            setActiveFilterPopup={setActiveFilterPopup}
            yearFilter={yearFilter}
            minYear={minmaxYears.min}
            maxYear={minmaxYears.max}
            sortOldestFilter={sortOldestFilter}
            replaceSearchParams={replaceSearchParams}
          />

          <ViewsFilterGroup
            isGridView={isGridView}
            replaceSearchParams={replaceSearchParams}
          />
        </div>
      </div>

      <div className={`card-grid ${isGridView ? "" : "list"}`}>
        {issues.data[getCategKey()] != null &&
          issues.data[getCategKey()][getKey()] != null &&
          issues.data[getCategKey()][getKey()].map((issue, idx) => (
            <IssueCard key={`issue-${slug}-${idx}`} data={issue} />
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
