import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/images/logo-archive.svg";
import menu from "../../assets/icons/menu.svg";
import select from "../../assets/icons/selection.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [search, toggleSearch] = useState(false);
  // TODO: search not functional

  return (
    <nav>
      <header>
        <div className="w-screen h-16 flex justify-between items-center px-6 font-chivo text-guidon fixed navbar-layout">
          <div className="flex items-center gap-32 flex-grow" style={{ paddingLeft: "5rem" }}>
            <img
              src={menu}
              alt=""
              className="w-221 h-46.968 md:hidden"
            />
            <Link to="/">
              <img src={logo} alt="The GUIDON" className="w-56 h-auto" />
            </Link>
            <div className="relative flex-grow md:w-96">
              <svg
                viewBox="0 0 17 18"
                width="17"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 md:left-5 ${
                  search ? "text-guidon" : "text-white"
                }`}
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
                placeholder="Find a press issue, magazine, primer, etc."
                className={`w-full pl-10 pr-4 py-2 rounded-full bg-ecf4ff focus:outline-none ${
                  search ? "text-guidon" : "text-white"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-8 mr-8">
            {/* Nav Home */}
            <button
              type="button"
              className="flex items-center px-16 py-8 rounded-16 bg-blue-the-guidon-blue"
            >
              Home
            </button>
            {/* Nav Release (DROPDOWN SELECTION) */}
            <div
              className="relative flex items-center px-16 py-8 rounded-16 bg-blue-the-guidon-blue select-flex-container"
              onMouseEnter={() => {
                console.log("Releases Open");
                // Add code to show/hide the overlay
                // and handle the animation if needed
              }}
            >
              Releases
              <img
                src={select}
                alt="Selection Icon"
                className="w-5 h-5" // Adjust width and height as needed
              />
            </div>
            {/* ABOUT */}
            <div
              className="relative flex items-center px-16 py-8 rounded-16 bg-blue-the-guidon-blue flex-container"
              onMouseEnter={() => {
                console.log('About Button Hovered');
                // Add code to show/hide the overlay or any other actions on hover               
              }}
            >
              {/* About Text */}
              About
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;