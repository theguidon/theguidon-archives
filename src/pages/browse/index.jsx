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
          <div className="advanced-filters">
            <div className="year-filter-container filter-container">
              <div
                className={`popup-container ${
                  activeFilterPopup === "year" ? "active" : ""
                }`}
              >
                <div className="popup">POPUP</div>
              </div>

              <div
                className={`filter ${yearFilter ? "active" : ""}`}
                onClick={() => {
                  if (activeFilterPopup === "year") setActiveFilterPopup(null);
                  else setActiveFilterPopup("year");
                }}
              >
                {yearFilter ? yearFilter : "Year"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.59368 7.28916C6.3155 6.98159 5.84001 6.95716 5.53163 7.2346C5.22325 7.51204 5.19876 7.98629 5.47693 8.29386L9.47295 12.7122C9.77229 13.0432 10.2933 13.0423 10.5915 12.7103L14.5248 8.33048C14.8019 8.02194 14.7757 7.54778 14.4664 7.27142C14.157 6.99506 13.6816 7.02114 13.4045 7.32968L10.3259 10.7577C10.1674 10.9343 9.89083 10.9348 9.73165 10.7588L6.59368 7.28916Z"
                    fill="#1C4480"
                  />
                </svg>
              </div>
            </div>

            <div className="sort-filter-container filter-container">
              <div
                className={`popup-container ${
                  activeFilterPopup === "sort" ? "active" : ""
                }`}
              >
                <div className="popup">
                  <p
                    className={
                      sortOldestFilter == null
                        ? ""
                        : sortOldestFilter
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      if (sortOldestFilter === true) setSortOldestFilter(null);
                      else setSortOldestFilter(true);
                      setActiveFilterPopup(null);
                    }}
                  >
                    Oldest first
                  </p>
                  <p
                    className={
                      sortOldestFilter == null
                        ? ""
                        : sortOldestFilter
                        ? ""
                        : "active"
                    }
                    onClick={() => {
                      if (sortOldestFilter === false) setSortOldestFilter(null);
                      else setSortOldestFilter(false);
                      setActiveFilterPopup(null);
                    }}
                  >
                    Newest first
                  </p>
                </div>
              </div>

              <div
                className={`filter ${sortOldestFilter == null ? "" : "active"}`}
                onClick={() => {
                  if (activeFilterPopup === "sort") setActiveFilterPopup(null);
                  else setActiveFilterPopup("sort");
                }}
              >
                {sortOldestFilter == null
                  ? "Sort by"
                  : sortOldestFilter
                  ? "Oldest first"
                  : "Newest first"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.59368 7.28916C6.3155 6.98159 5.84001 6.95716 5.53163 7.2346C5.22325 7.51204 5.19876 7.98629 5.47693 8.29386L9.47295 12.7122C9.77229 13.0432 10.2933 13.0423 10.5915 12.7103L14.5248 8.33048C14.8019 8.02194 14.7757 7.54778 14.4664 7.27142C14.157 6.99506 13.6816 7.02114 13.4045 7.32968L10.3259 10.7577C10.1674 10.9343 9.89083 10.9348 9.73165 10.7588L6.59368 7.28916Z"
                    fill="#1C4480"
                  />
                </svg>
              </div>
            </div>
          </div>

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
