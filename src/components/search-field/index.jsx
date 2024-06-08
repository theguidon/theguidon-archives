import "./index.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchField(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();

  const [variant, setVariant] = useState(Math.floor(Math.random() * 3));
  const [subvariant, setSubvariant] = useState(Math.floor(Math.random() * 5));

  const onSubmit = (event) => {
    event.preventDefault();

    let nsp = searchParams;
    nsp.set("query", query);
    navigate(`/search?${nsp.toString()}`);
  };

  const getVariantText = () => {
    // 0: Find a press issue, magazine, primer, etc.
    // 1: Search 'Colayco'
    // 2: Search 'Volume [#]' or '[title]'
    if (variant == 0) {
      return "Find a press issue, magazine, primer, etc.";
    } else if (variant == 1) {
      return 'Search "Colayco"';
    } else if (variant == 2) {
      return 'Search "Volume [#]" or "[title]"';
    }
  };

  useEffect(() => {
    setQuery("");
  }, [location.pathname]);

  useEffect(() => {
    let q = searchParams.get("query");
    if (q) setQuery(searchParams.get("query"));
  }, [searchParams.get("query")]);

  return (
    <form className="search-field" onSubmit={onSubmit}>
      <svg
        className="search"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7999 2.3999C15.4391 2.3999 19.1999 6.16071 19.1999 10.7999C19.1999 12.6916 18.5746 14.4372 17.5195 15.8413L17.5853 15.8928L17.6484 15.9514L21.2484 19.5514C21.7171 20.02 21.7171 20.7798 21.2484 21.2484C20.8158 21.681 20.1352 21.7143 19.6644 21.3483L19.5514 21.2484L15.9514 17.6484C15.9103 17.6074 15.8729 17.5641 15.839 17.519C14.4372 18.5746 12.6916 19.1999 10.7999 19.1999C6.16071 19.1999 2.3999 15.4391 2.3999 10.7999C2.3999 6.16071 6.16071 2.3999 10.7999 2.3999ZM10.7999 4.7999C7.48619 4.7999 4.7999 7.48619 4.7999 10.7999C4.7999 14.1136 7.48619 16.7999 10.7999 16.7999C14.1136 16.7999 16.7999 14.1136 16.7999 10.7999C16.7999 7.48619 14.1136 4.7999 10.7999 4.7999Z"
        />
      </svg>

      <input
        type="text"
        name="query"
        placeholder={getVariantText()}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={(e) => {
          if (props.fieldRef != null) props.fieldRef.current = e;
        }}
      />
    </form>
  );
}

export default SearchField;
