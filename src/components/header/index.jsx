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
            <div className="popup-container">
              <nav className="popup">
                <NavLink to="/releases/recent">Recently Uploaded</NavLink>
                <NavLink to="/releases/press">Press Issues</NavLink>
                <NavLink to="/releases/gradmag">Graduation Magazines</NavLink>
                <NavLink to="/releases/freshmanual">Freshmanuals</NavLink>
                <NavLink to="/releases/uaap-primer">UAAP Primers</NavLink>
                <NavLink to="/releases/legacy">Over the Years</NavLink>
                <NavLink to="/releases/others">Others</NavLink>
              </nav>
            </div>

            <NavLink to="/releases">
              Releases
              <svg
                className="chevron"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.5938 7.28965C6.31563 6.98208 5.84013 6.95765 5.53175 7.23509C5.22337 7.51253 5.19889 7.98678 5.47706 8.29435L9.47308 12.7127C9.77242 13.0437 10.2934 13.0428 10.5916 12.7108L14.5249 8.33097C14.802 8.02243 14.7759 7.54827 14.4665 7.27191C14.1572 6.99555 13.6818 7.02163 13.4047 7.33017L10.326 10.7582C10.1675 10.9348 9.89095 10.9353 9.73177 10.7593L6.5938 7.28965Z" />
              </svg>
            </NavLink>
          </div>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
