import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, toggleSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        navigate(`/search?=${formData.get("search")}`);
      }}
      className="relative max-w-[34rem] min-w-[23rem] w-full hidden lg:flex"
    >
      <svg
        viewBox="0 0 17 18"
        width="17"
        height="18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer text-${
          search ? "guidon" : "white"
        } absolute top-1/2 -translate-y-1/2 left-3 md:text-guidon`}
        onClick={() => toggleSearch(!search)}
      >
        <g id="ic20-search">
          <path
            id="Icon"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.83017 2.62427C11.0401 2.62427 13.6423 5.22643 13.6423 8.43637C13.6423 9.74524 13.2096 10.9531 12.4795 11.9246L12.5251 11.9602L12.5688 12.0008L15.0597 14.4917C15.3839 14.8159 15.3839 15.3416 15.0597 15.6659C14.7604 15.9652 14.2894 15.9882 13.9637 15.735L13.8855 15.6659L11.3946 13.175C11.3662 13.1466 11.3402 13.1166 11.3168 13.0854C10.3469 13.8158 9.13904 14.2485 7.83017 14.2485C4.62023 14.2485 2.01807 11.6463 2.01807 8.43637C2.01807 5.22643 4.62023 2.62427 7.83017 2.62427ZM7.83019 4.28489C5.53737 4.28489 3.67868 6.14358 3.67868 8.43639C3.67868 10.7292 5.53737 12.5879 7.83019 12.5879C10.123 12.5879 11.9817 10.7292 11.9817 8.43639C11.9817 6.14358 10.123 4.28489 7.83019 4.28489Z"
            fill="currentColor"
          />
        </g>
      </svg>
      <input
        type="text"
        name="search"
        placeholder="Find a press issue, magazine, primer, etc."
        className={`w-full pl-10 pr-4 py-2 rounded-full bg-ecf4ff focus:outline-none ${
          search ? "text-guidon" : "text-guidon"
        }`}
      />
    </form>
  );
};

export default SearchBar;
