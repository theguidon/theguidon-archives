import "./index.css";

function SearchPage() {
  return (
    <div id="search-results" className="general-container">
      <p className="subheader">We couldn't find any matches for</p>
      <h2>“What is the best GDN Staff?”</h2>
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
