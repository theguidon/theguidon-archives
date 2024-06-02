import { NavLink, useParams, Navigate } from "react-router-dom";
import "./index.css";
import "./filters.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../../redux/modules/issues";
import IssueCard from "../../components/issue-card";

function BrowsePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [isGridView, setIsGridView] = useState(true);

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

  const issues = useSelector((state) => state.issues);
  const [page, setPage] = useState(1);

  const getSortedIssuesPage = () => {
    let key = `${sortOldestFilter === true ? "asc-" : ""}${page}`;

    if (
      issues.data[actual[slug]] != null &&
      issues.data[actual[slug]][key] != null
    )
      return issues.data[actual[slug]][key];
    return [];
  };

  const getSortedIssues = () => {};

  // console.log(issues);

  const categ_filters = [
    {
      slug: "recent",
      text: "All",
    },
    {
      slug: "press",
      text: "Press Issues",
    },
    {
      slug: "gradmag",
      text: "GradMag",
    },
    {
      slug: "freshmanual",
      text: "Freshmanual",
    },
    {
      slug: "uaap-primer",
      text: "UAAP Primers",
    },
    {
      slug: "legacy",
      text: "Over the Years",
    },
    {
      slug: "others",
      text: "Others",
    },
  ];

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
  }, [page, slug, sortOldestFilter]);

  const calculatePageNums = () => {
    if (issues.data[actual[slug]] != null) {
      let lim_left = page - 2;
      let lim_right = page + 2;

      // adjust right
      if (lim_right >= issues.data[actual[slug]].max_pages) {
        lim_left -= lim_right - issues.data[actual[slug]].max_pages;
        lim_right -= lim_right - issues.data[actual[slug]].max_pages;
      }

      // adjust left
      if (lim_left <= 0) {
        let excess = 1 - lim_left;
        lim_left += 1 - lim_left;
        if (lim_right < issues.data[actual[slug]].max_pages) {
          lim_right += Math.min(
            excess,
            issues.data[actual[slug]].max_pages - lim_right
          );
        }
      }

      return [...Array(lim_right - lim_left + 1)].map(
        (_, idx) => idx + lim_left
      );
    }

    return [1];
  };

  if (slug == null) return <Navigate to="/releases/recent" />;

  return (
    <div id="browse" className="general-container">
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
        <div className="categ-filters">
          {categ_filters.map((categ) => (
            <NavLink
              to={`/releases${categ.slug ? "/" + categ.slug : ""}`}
              key={`categ-filter-${categ.slug}`}
            >
              {categ.text}
            </NavLink>
          ))}
        </div>

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

          <div className="views-group">
            <svg
              className={`view ${isGridView ? "active" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              onClick={() => {
                setIsGridView(true);
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 18C25.1046 18 26 18.8954 26 20V24C26 25.1046 25.1046 26 24 26H20C18.8954 26 18 25.1046 18 24V20C18 18.8954 18.8954 18 20 18H24ZM12 18C13.1046 18 14 18.8954 14 20V24C14 25.1046 13.1046 26 12 26H8C6.89543 26 6 25.1046 6 24V20C6 18.8954 6.89543 18 8 18H12ZM12 6C13.1046 6 14 6.89543 14 8V12C14 13.1046 13.1046 14 12 14H8C6.89543 14 6 13.1046 6 12V8C6 6.89543 6.89543 6 8 6H12ZM24 6C25.1046 6 26 6.89543 26 8V12C26 13.1046 25.1046 14 24 14H20C18.8954 14 18 13.1046 18 12V8C18 6.89543 18.8954 6 20 6H24Z"
              />
            </svg>

            <svg
              className={`view ${isGridView ? "" : "active"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              onClick={() => {
                setIsGridView(false);
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 12C26 13.1046 25.1046 14 24 14H8C6.89543 14 6 13.1046 6 12V8C6 6.89543 6.89543 6 8 6H24C25.1046 6 26 6.89543 26 8V12ZM26 24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V20C6 18.8954 6.89543 18 8 18H24C25.1046 18 26 18.8954 26 20V24Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={`card-grid ${isGridView ? "" : "list"}`}>
        {getSortedIssuesPage().map((issue, idx) => (
          <IssueCard key={`issue-${slug}-${idx}`} data={issue} />
        ))}
      </div>

      {calculatePageNums().length > 1 && (
        <div className="pagination">
          <div
            className={calculatePageNums()[0] == page ? "hide" : ""}
            onClick={() => {
              setPage((p) => p - 1);
            }}
          >
            <svg
              className="arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 10C18 10.5523 17.5523 11 17 11H5.415L7.70711 13.2929C8.06759 13.6534 8.09532 14.2206 7.7903 14.6129L7.70711 14.7071C7.34662 15.0676 6.77939 15.0953 6.3871 14.7903L6.29289 14.7071L2.29289 10.7071L2.2515 10.6631L2.19633 10.5953L2.12467 10.4841L2.07123 10.3713L2.03585 10.266L2.00683 10.1175L2 10L2.00279 9.92476L2.02024 9.79927L2.04974 9.68786L2.09367 9.57678L2.146 9.47929L2.21279 9.38325C2.23767 9.35153 2.26443 9.32136 2.29289 9.29289L6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289C8.06759 5.65338 8.09532 6.22061 7.7903 6.6129L7.70711 6.70711L5.415 9H17C17.5523 9 18 9.44772 18 10Z"
                fill="black"
              />
            </svg>
          </div>

          {calculatePageNums().map((num, idx) => (
            <div
              key={`page-num-${idx}`}
              onClick={() => {
                setPage(num);
              }}
            >
              <p className={page == num ? "active" : ""}>{num}</p>
            </div>
          ))}

          <div
            className={calculatePageNums().pop() == page ? "hide" : ""}
            onClick={() => {
              setPage((p) => p + 1);
            }}
          >
            <svg
              className="arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 10C2 9.44772 2.44772 9 3 9H14.585L12.2929 6.70711C11.9324 6.34662 11.9047 5.77939 12.2097 5.3871L12.2929 5.29289C12.6534 4.93241 13.2206 4.90468 13.6129 5.2097L13.7071 5.29289L17.7071 9.29289L17.7485 9.33685L17.8037 9.40469L17.8753 9.51594L17.9288 9.62866L17.9642 9.73401L17.9932 9.88253L18 10L17.9972 10.0752L17.9798 10.2007L17.9503 10.3121L17.9063 10.4232L17.854 10.5207L17.7872 10.6168C17.7623 10.6485 17.7356 10.6786 17.7071 10.7071L13.7071 14.7071C13.3166 15.0976 12.6834 15.0976 12.2929 14.7071C11.9324 14.3466 11.9047 13.7794 12.2097 13.3871L12.2929 13.2929L14.585 11H3C2.44772 11 2 10.5523 2 10Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowsePage;
