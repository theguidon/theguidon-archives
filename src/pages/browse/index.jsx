import {
  NavLink,
  useParams,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
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

function BrowsePage() {
  const { slug } = useParams();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const minYear = 1929;
  const maxYear = 2024;

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
      parseInt(searchParams.get("year")) >= minYear &&
      parseInt(searchParams.get("year")) <= maxYear
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

  useEffect(() => {
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

  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);

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

  const getKey = () => `${sortOldestFilter === true ? "asc-" : ""}${page}`;

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

        if (intyear >= minYear && intyear <= maxYear) {
          if (parseFloat(year) % 1 == 0) setYearFilter(intyear);
          else toReplace.push({ key: "year", value: intyear });
        } else toReplace.push({ key: "year", delete: true });
      } else toReplace.push({ key: "year", delete: true });

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

  if (slug == null) {
    console.log("redirecting");
    return <Navigate to="/releases/recent" />;
  }

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
            minYear={minYear}
            maxYear={maxYear}
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
        {issues.data[actual[slug]] != null &&
          issues.data[actual[slug]][getKey()] != null &&
          issues.data[actual[slug]][getKey()].map((issue, idx) => (
            <IssueCard key={`issue-${slug}-${idx}`} data={issue} />
          ))}
      </div>

      {calculatePageNums(issues.data[actual[slug]], page).length > 1 && (
        <Pagination
          pageNums={calculatePageNums(issues.data[actual[slug]], page)}
          page={page}
          replaceSearchParams={replaceSearchParams}
        />
      )}
    </div>
  );
}

export default BrowsePage;
