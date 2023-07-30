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
        <div className="w-screen h-16 flex justify-between items-center px-6 font-chivo text-guidon fixed navbar-layout " style={{ paddingRight: "6rem" }}>
          <div className="flex items-center gap-32 flex-grow" style={{ paddingLeft: "5rem" }}>
            <img src={menu} alt="" className="w-221 h-46.968 md:hidden" />
            <Link to="/">
              <img src={logo} alt="The GUIDON" className="w-56 h-auto" />
            </Link>
            <div className="flex-grow flex justify-end">
              <SearchBar />
              <NavigationItems />
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;