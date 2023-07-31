import React from "react";
import { Link } from "react-router-dom";
import select from "../../assets/icons/selection.svg";

const NavigationItems = () => {
  return (
    <div className="flex items-center ml-8 nav-container">
      {/* Nav Home */}
      <Link
        to="/"
        type="button"
        className="flex items-center px-4 py-2 rounded-16 bg-blue-the-guidon-blue font-bold mr-2 nav-button"
      >
        Home
      </Link>
      {/* Nav Release (DROPDOWN SELECTION) */}
      <button
        className="relative flex items-center px-4 py-2 rounded-16 bg-blue-the-guidon-blue font-bold mr-2 nav-dropdown"
        onMouseEnter={() => {
          console.log("Releases Open");
          // Add code to show/hide the overlay and handle the animation if needed
        }}
      >
        Releases
        <img
          src={select}
          alt="Selection Icon"
          className="w-5 h-5 ml-1" // Adjust width and height as needed
        />
      </button>
      {/* ABOUT */}
      <Link
        to="/about"
        className="relative flex items-center px-4 py-2 rounded-16 bg-blue-the-guidon-blue flex-container font-bold nav-button"
        onMouseEnter={() => {
          console.log("About Button Hovered");
          // Add code to show/hide the overlay or any other actions on hover
        }}
      >
        {/* About Text */}
        About
      </Link>
    </div>
  );
};

export default NavigationItems;
