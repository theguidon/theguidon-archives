import React from "react";
import logo from "../assets/images/logo.png";
import search from "../assets/icons/search.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full fixed flex justify-center items-center bg-blue-900 px-12 py-3 text-white font-chivo text-s z-50">
      <div className="flex w-full justify-between">
        <div className="flex items-center pl-12 gap-1.5">
          <img className="" src={logo} alt="The GUIDON" />
          <p className="mt-auto mb-1 font-bold">ARCHIVES</p>
        </div>
        <div className="flex pr-12 gap-6">
          <ul className="flex items-center">
            <Link to="/">
              <li className="text-white mx-6 font-bold">HOME</li>
            </Link>
            <Link to="/about">
              <li className="text-white mx-6 font-bold">ABOUT</li>
            </Link>
            <Link to="/releases">
              <li className="text-white mx-6 font-bold">RELEASES</li>
            </Link>
          </ul>
          <div className="flex justify-between text-black items-center px-4 py-1.5 bg-white rounded-lg">
            <input
              className="focus:outline-none bg-white"
              type="text"
              placeholder="Search"
            />
            <img src={search} alt="search" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
