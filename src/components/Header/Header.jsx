import React, { useState } from "react";
import logo from "../../assets/images/logo-white.svg";
import menu from "../../assets/icons/menu.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [search, toggleSearch] = useState(false);
  // TODO: search not functional
  return (
    <>
      <header>
        <div className="w-screen h-16 bg-guidon flex flex-row justify-between items-center px-6 font-chivo text-white fixed">
          <img
            src={menu}
            alt=""
            className="w-[1.4rem] aspect-square md:hidden"
          />
          <Link to="/">
            <img src={logo} alt="The GUIDON" className="w-56" />
          </Link>
          <nav className="flex flex-row items-center gap-x-4 h-full">
            <div className="hidden md:flex flex-row h-full font-bold">
              {[
                ["HOME", "/"],
                ["ABOUT", "/about"],
                ["RELEASES", "/releases"],
              ].map(([title, url]) => {
                return (
                  <Link
                    key={title}
                    to={url}
                    className="relative p-4 flex flex-row items-center hover:bg-[rgba(114,164,215,0.20)] after:content-[''] after:w-[calc(100%-2rem)] after:h-[2px] after:bg-white after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[calc(50%+0.75rem)] after:hover:inline-block after:hidden"
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
            <div className="relative text-guidon w-[1.4rem] aspect-square md:w-[14rem]">
              <input
                type="text"
                placeholder="Search"
                className={`px-4 py-2 rounded-lg absolute top-1/2 -translate-y-1/2 right-0 w-[calc(100vw-2.8rem)] ${
                  search ? "block" : "hidden"
                } md:block md:w-[14rem]`}
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
                } absolute top-1/2 -translate-y-1/2 right-4 md:text-guidon`}
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
            </div>
          </nav>
        </div>
        <div className="w-screen h-16" />
      </header>
    </>
    // <header className="w-full fixed flex justify-center items-center bg-blue-900 px-12 py-3 text-white font-chivo text-s z-50">
    //   <div className="flex w-full justify-between">
    //     <div className="flex items-center pl-12 gap-1.5">
    //       <img className="" src={logo} alt="The GUIDON" />
    //     </div>
    //     <div className="flex pr-12 gap-6">
    //       <ul className="flex items-center">
    // <Link to="/">
    //   <li className="text-white mx-6 font-bold">HOME</li>
    // </Link>
    // <Link to="/about">
    //   <li className="text-white mx-6 font-bold">ABOUT</li>
    // </Link>
    // <Link to="/releases">
    //   <li className="text-white mx-6 font-bold">RELEASES</li>
    // </Link>
    //       </ul>
    //       <form className="flex justify-between text-black items-center px-4 py-1.5 bg-white rounded-lg">
    //         <input
    //           className="focus:outline-none bg-white"
    //           type="text"
    //           placeholder="Search"
    //         />
    //         <img src={search} alt="search" />
    //       </form>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
