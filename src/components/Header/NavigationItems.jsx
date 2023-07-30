import React from "react";
import { Link } from "react-router-dom";
import select from "../../assets/icons/selection.svg";

const NavigationItems = () => {
  return (
    <div className="flex items-center pl-10">
      {/* Nav Home */}
      <button
        type="button"
        className="flex items-center px-2 py-8 rounded-16 bg-blue-the-guidon-blue font-bold mr-2 nav-button"
      >
        Home
      </button>
      {/* Nav Release (DROPDOWN SELECTION) */}
      <button
        className="relative flex items-center px-2 py-8 rounded-16 bg-blue-the-guidon-blue font-bold mr-2 nav-button"
        onMouseEnter={() => {
          console.log("Releases Open");
          // Add code to show/hide the overlay and handle the animation if needed
        }}
      >
        Releases
        <img
          src={select}
          alt="Selection Icon"
          className="w-5 h-5" // Adjust width and height as needed
        />
      </button>
      {/* ABOUT */}
      <button
        className="relative flex items-center px-2 py-8 rounded-16 bg-blue-the-guidon-blue flex-container font-bold nav-button"
        onMouseEnter={() => {
          console.log('About Button Hovered');
          // Add code to show/hide the overlay or any other actions on hover
        }}
      >
        {/* About Text */}
        About
      </button>
    </div>
  );
};

export default NavigationItems;