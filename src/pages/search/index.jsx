import { useLocation } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchIssues } from "../../redux/modules/issues";

function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query");

  const [isGridView, setIsGridView] = useState(true);
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState(null);
  const [sortOldestFilter, setSortOldestFilter] = useState(null);
  const [activeFilterPopup, setActiveFilterPopup] = useState(null);

  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(
      fetchIssues({
        query: query,
        page: page,
        order: sortOldestFilter ? "asc" : "desc",
      })
    );
  }, [query, page, yearFilter, sortOldestFilter]);

  return (
    <div id="search-results" className="general-container general-padding-top">
      <p className="subheader">We couldn't find any matches for</p>
      <h2>{`“${query}”`}</h2>
      <hr />

      <ul>
        <li>Double-check the spelling or try using different keywords.</li>
        <li>Broaden your search query to include more general terms.</li>
        <li>
          Try refining your search with specific filters to narrow down the
          results.
        </li>
      </ul>
    </div>
  );
}

export default SearchPage;
