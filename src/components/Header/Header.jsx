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
    <>
     <nav>
      <header>
        <div className="inline-flex justify-between items-center flex-col gap-32 bg-white w-screen px-6 py-16 font-chivo text-guidon fixed shadow-nav">
          <div className="w-1440 px-104 flex justify-between items-center gap-32">
            <div className="flex justify-center items-center gap-617">
              <img
              src={menu}
              alt=""
              className="w-221 h-46.968 md:hidden"
              />
            <Link to="/">
              <img src={logo} alt="The GUIDON" className="w-56 h-auto" />
            </Link>
            </div>
            <div className="flex items-center w-545 h-40 rounded-32">
              <input 
                type="text"
                placeholder="Find a press issue, magazine, primer, etc."
                className="w-full px-4 py-2 rounded-full bg-ecf4ff" 
              />
              <svg
                viewBox="0 0 17 18"
                width="17"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  toggleSearch(!search);
                }}
                className={`cursor-pointer text-${
                  search ? "guidon" : "white"
                } absolute top-1/2 -translate-y-1/2 md:text-guidon`}
                >
              </svg>
            </div>

            <div className="flex justify-between items-center w-318 flex-shrink-0">
              {/* Nav Home */}
              <div className="flex items-center gap-8">
                <button
                  type="button"
                  className="flex items-center px-16 py-8 rounded-16 bg-blue-the-guidon-blue"
                >
                  Home
                </button>
              </div>

              {/* Nav Release (DROPDOWN SELECTION) */}
              <div className="flex flex-col items-center gap-8 w-143 flex-shrink-0">
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
                {/* Dropdown Content (overlay) */}
                {/* ... (Add your dropdown content here) ... */}
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
        </div>
      </header>
    </nav>
    </>
  );
};

export default Header;
