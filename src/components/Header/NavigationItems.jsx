import React from "react";
import { Link } from "react-router-dom";

const NavigationItems = () => {
  return (
    <div className="flex-row first-letter:items-center nav-container gap-x-4 hidden lg:flex">
      {/* Nav Home */}
      <Link
        to="/"
        type="button"
        className="flex items-center rounded-16 bg-blue-the-guidon-blue font-bold hover:bg-guidon rounded-2xl hover:text-white px-4 py-2"
      >
        Home
      </Link>
      {/* Nav Release (DROPDOWN SELECTION) */}
      <button
        className="relative flex flex-row items-center rounded-16 bg-blue-the-guidon-blue font-bold w-max hover:bg-guidon rounded-2xl hover:text-white px-4 py-2"
        onMouseEnter={() => {
          console.log("Releases Open");
          // Add code to show/hide the overlay and handle the animation if needed
        }}
      >
        Releases
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Chevron down">
            <path
              id="Glyph"
              d="M6.59355 7.77353C6.31538 7.46596 5.83989 7.44154 5.53151 7.71898C5.22313 7.99642 5.19864 8.47066 5.47681 8.77824L9.47283 13.1966C9.77217 13.5276 10.2932 13.5267 10.5913 13.1946L14.5247 8.81485C14.8018 8.50631 14.7756 8.03216 14.4663 7.75579C14.1569 7.47943 13.6815 7.50552 13.4044 7.81406L10.3258 11.2421C10.1672 11.4187 9.8907 11.4192 9.73152 11.2432L6.59355 7.77353Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
      {/* ABOUT */}
      <Link
        to="/about"
        className="relative flex items-center rounded-16 bg-blue-the-guidon-blue flex-container font-bold hover:bg-guidon rounded-2xl hover:text-white px-4 py-2"
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
