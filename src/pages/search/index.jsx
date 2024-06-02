import { useLocation } from "react-router-dom";
import "./index.css";

function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query");

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
