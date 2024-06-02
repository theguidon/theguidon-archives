import { NavLink, useParams, Navigate } from "react-router-dom";
import "./index.css";
import "./filters.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";
import Pagination from "../../components/pagination";
import { calculatePageNums } from "../../utils/calculate-page-nums";
import ViewsFilterGroup from "../../components/filters/views";
import CategoriesFilterGroup from "../../components/filters/categories";
import AdvancedFiltersGroup from "../../components/filters/advanced";

function BrowsePage() {
  const { slug } = useParams();

  const [isGridView, setIsGridView] = useState(true);
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState(null);
  const [sortOldestFilter, setSortOldestFilter] = useState(null);
  const [activeFilterPopup, setActiveFilterPopup] = useState(null);

  useEffect(() => {
    dispatch(fetchIssues({}));
    dispatch(fetchIssues({ categ: "press-issue" }));
    dispatch(fetchIssues({ categ: "graduation-magazine" }));
    dispatch(fetchIssues({ categ: "freshmanual" }));
    dispatch(fetchIssues({ categ: "uaap-primer" }));
    dispatch(fetchIssues({ categ: "legacy" }));
    dispatch(fetchIssues({ categ: "other" }));
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

  useEffect(() => {
    setPage(1);
  }, [slug]);

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
        <CategoriesFilterGroup />

        <div className="advanced-group">
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
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default BrowsePage;
