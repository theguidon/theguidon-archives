import React from "react";
import { Link } from "react-router-dom";
import select from "../../assets/icons/selection.svg";

const NavigationItems = () => {
  return (
    <div className="flex flex-row first-letter:items-center nav-container gap-x-4">
      {/* Nav Home */}
      <Link
        to="/"
        type="button"
        className="flex items-center rounded-16 bg-blue-the-guidon-blue font-bold "
      >
        Home
      </Link>
      {/* Nav Release (DROPDOWN SELECTION) */}
      <button
        className="relative flex flex-row items-center rounded-16 bg-blue-the-guidon-blue font-bold w-max"
        onMouseEnter={() => {
          console.log("Releases Open");
          // Add code to show/hide the overlay and handle the animation if needed
        }}
      >
        Releases
        <img
          src={select}
          alt="Selection Icon"
          className="w-5" // Adjust width and height as needed
        />
      </button>
      {/* ABOUT */}
      <Link
        to="/about"
        className="relative flex items-center rounded-16 bg-blue-the-guidon-blue flex-container font-bold "
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
