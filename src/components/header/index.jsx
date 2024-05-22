import { Link, NavLink } from "react-router-dom";
import "./index.css";

import SearchField from "../search-field";
import logo from "./../../assets/logos/base-white.svg";

function Header() {
  return (
    <header>
      <div className="general-container">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>

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
