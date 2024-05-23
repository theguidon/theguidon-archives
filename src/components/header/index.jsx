import { Link, NavLink, useLocation } from "react-router-dom";
import "./index.css";

import SearchField from "./../search-field";
import MobileMenu from "./../mobile-menu";

import logo from "./../../assets/logos/base-white.svg";
import hamburger from "./../../assets/icons/hamburger-white.svg";
import search from "./../../assets/icons/search-white.svg";
import { useEffect, useState } from "react";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const location = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  useEffect(() => {
    if (showMobileMenu) setShowMobileMenu(false);
    if (showMobileSearch) setShowMobileSearch(false);
  }, [location.pathname]);

  return (
    <header>
      <div className="general-container">
        <img
          id="menu-icon"
          className="mobile-icon"
          src={hamburger}
          onClick={toggleMobileMenu}
        />

        <MobileMenu
          isActive={showMobileMenu}
          toggleMobileMenu={toggleMobileMenu}
        />

        <Link to="/">
          <img className="logo" src={logo} />
        </Link>

        <img
          id="search-icon"
          className="mobile-icon"
          src={search}
          onClick={toggleMobileSearch}
        />

        <SearchField />

        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <div className="releases-link-container">
            <NavLink to="/releases">
              Releases
              <div className="chevron-down" />
            </NavLink>

            <div className="popup-container">
              <nav className="popup">
                <NavLink to="/releases/recent">Recently Uploaded</NavLink>
                <NavLink to="/releases/this-term">This Term</NavLink>
                <NavLink to="/releases/press">Press Issues</NavLink>
                <NavLink to="/releases/gradmag">Graduation Magazines</NavLink>
                <NavLink to="/releases/freshmanual">Freshmanuals</NavLink>
                <NavLink to="/releases/uaap-primers">UAAP Primers</NavLink>
                <NavLink to="/releases/others">Others</NavLink>
              </nav>
            </div>
          </div>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
