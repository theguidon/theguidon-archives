import React from "react";
import "./styles.css";
import logo from "../../assets/images/logo-archive.svg";
import menu from "../../assets/icons/menu.svg";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavigationItems from "./NavigationItems";

const Header = () => {
  return (
    <nav>
      <header>
        <div className="w-screen h-16 flex justify-between items-center px-[6.5rem] font-chivo text-guidon fixed z-50 bg-white">
          <Link to="/">
            <img src={logo} alt="The GUIDON" className="w-56 h-auto" />
          </Link>
          <SearchBar />
          <NavigationItems />
        </div>
      </header>
      <div className="h-16 w-screen" />
    </nav>
  );
};

export default Header;
