import "./index.css";

import searchIcon from "./../../assets/icons/search.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function SearchField() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    let q = searchParams.get("query");

    if (q) setQuery(searchParams.get("query"));
  }, [searchParams.get("query")]);

  return (
    <form className="search-field" onSubmit={onSubmit}>
      <img src={searchIcon} />
      <input
        type="text"
        name="query"
        placeholder="Find a press issue, magazine, primer, etc."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchField;
