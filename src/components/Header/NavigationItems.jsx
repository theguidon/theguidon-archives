import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationItems = () => {
  const [releaseActive, setReleaseActive] = useState(false);
  return (
    <div className="flex-row first-letter:items-center nav-container gap-x-4 hidden lg:flex">
      {/* Nav Home */}
      <Link
        to="/"
        type="button"
        className="flex items-center rounded-16 bg-blue-the-guidon-blue font-bold hover:bg-[#DBE9F4] rounded-2xl  px-4 py-2"
      >
        Home
      </Link>
      {/* Nav Release (DROPDOWN SELECTION) */}
      <button
        className={`relative flex flex-row items-center rounded-16 font-bold w-max hover:bg-[#DBE9F4] rounded-2xl ${
          releaseActive ? "text-white !bg-guidon" : "text-guidon"
        } px-4 py-2`}
        onClick={() => {
          setReleaseActive(!releaseActive);
        }}
      >
        Releases
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={releaseActive ? "-scale-y-100" : ""}
        >
          <g id="Chevron down">
            <path
              id="Glyph"
              d="M6.59355 7.77353C6.31538 7.46596 5.83989 7.44154 5.53151 7.71898C5.22313 7.99642 5.19864 8.47066 5.47681 8.77824L9.47283 13.1966C9.77217 13.5276 10.2932 13.5267 10.5913 13.1946L14.5247 8.81485C14.8018 8.50631 14.7756 8.03216 14.4663 7.75579C14.1569 7.47943 13.6815 7.50552 13.4044 7.81406L10.3258 11.2421C10.1672 11.4187 9.8907 11.4192 9.73152 11.2432L6.59355 7.77353Z"
              fill="currentColor"
            />
          </g>
        </svg>
        {releaseActive ? (
          <div className="font-chivo text-sm leading-6 font-normal absolute text-[#6A757C] flex flex-col top-[calc(100%+0.5rem)] text-left bg-white rounded-2xl px-3 py-2 gap-y-2 w-max left-1/2 -translate-x-1/2 shadow-[3px_2px_20px_6px_rgba(0,_0,_0,_0.08)]">
            <Link
              className="hover:bg-[#DBE9F4] px-4 py-1 rounded-2xl"
              to="/browse/press-issues"
            >
              Press Issues
            </Link>
            <Link
              className="hover:bg-[#DBE9F4] px-4 py-1 rounded-2xl"
              to="/browse/freshmanuals"
            >
              Freshmanuals
            </Link>
            <Link
              className="hover:bg-[#DBE9F4] px-4 py-1 rounded-2xl"
              to="/browse/graduation-magazines"
            >
              Graduation Magazines
            </Link>
            <Link
              className="hover:bg-[#DBE9F4] px-4 py-1 rounded-2xl"
              to="/browse/uaap-primers"
            >
              UAAP Primers
            </Link>
            <Link
              className="hover:bg-[#DBE9F4] px-4 py-1 rounded-2xl"
              to="/browse/other"
            >
              Other
            </Link>
          </div>
        ) : null}
      </button>
      {/* ABOUT */}
      <Link
        to="/about"
        className="relative flex items-center rounded-16 bg-blue-the-guidon-blue flex-container font-bold hover:bg-[#DBE9F4] rounded-2xl  px-4 py-2"
      >
        About
      </Link>
    </div>
  );
};

export default NavigationItems;
