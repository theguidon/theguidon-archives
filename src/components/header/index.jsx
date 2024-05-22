import { Link } from "react-router-dom";
import "./index.css";

import SearchField from "../search-field";
import logo from "./../../assets/logos/base-white.svg";
import chevronDown from "./../../assets/icons/chevron-down.svg";

function Header() {
  return (
    <header>
      <div className="general-container">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>

        <SearchField />

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/releases/all">
            Releases
            <div className="chevron-down" />
            <div className="popup-container">
              <nav className="popup">
                <Link to="/releases/recent">Recently Uploaded</Link>
                <Link to="/releases/this-term">This Term</Link>
                <Link to="/releases/press">Press Issues</Link>
                <Link to="/releases/gradmag">Graduation Magazines</Link>
                <Link to="/releases/freshmanual">Freshmanuals</Link>
                <Link to="/releases/uaap-primers">UAAP Primers</Link>
                <Link to="/releases/others">Others</Link>
              </nav>
            </div>
          </Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
