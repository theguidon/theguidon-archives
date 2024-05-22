import { Link } from "react-router-dom";
import "./index.css";

import logo from "./../../assets/logos/base-white.svg";
import icon_facebook from "./../../assets/icons/facebook.svg";
import icon_twitter from "./../../assets/icons/twitter.svg";
import icon_instagram from "./../../assets/icons/instagram.svg";
import icon_youtube from "./../../assets/icons/youtube.svg";
import icon_spotify from "./../../assets/icons/spotify.svg";

function Footer() {
  const onSubscribe = (event) => {
    event.preventDefault();
  };

  return (
    <footer>
      <div className="general-container">
        <div className="content">
          <div className="logo-desc-group">
            <img className="logo" src={logo} />

            <p className="logo">
              The Archives is a collection of The GUIDON's published content
              since 1929, chronicling its history as the official student
              publication of the Ateneo de Manila University.
            </p>
          </div>

          <div className="browse">
            <p className="subheader">Browse the Archives</p>
            <Link to="/releases/recent">Recently Uploaded</Link>
            <Link to="/releases/this-term">Releases This Term</Link>
            <Link to="/releases/press">Press Issues</Link>
            <Link to="/releases/gradmag">Graduation Magazines</Link>
            <Link to="/releases/freshmanual">Freshmanual</Link>
            <Link to="/releases/uaap-primers">UAAP Primers</Link>
            <Link to="/releases/others">Others</Link>
          </div>

          <div className="more">
            <p className="subheader">More from The GUIDON</p>
            <Link to="https://theguidon.com">The GUIDON Main</Link>
            <Link to="https://interactive.theguidon.com">
              The GUIDON Interactive
            </Link>
            <Link to="https://vantage.theguidon.com">Vantage Magazine</Link>
          </div>

          <div className="newsletter-group">
            <p className="subscribe">Subscribe to our newsletter</p>
            <form id="subscribe-form" onSubmit={onSubscribe}>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 5.05L14 12.75C14 13.2628 13.614 13.6855 13.1166 13.7433L13 13.75H3.00001C2.48718 13.75 2.06451 13.364 2.00674 12.8666L2.00001 12.75L2 5.05L7.34151 9.50259C7.71853 9.83249 8.28149 9.83249 8.65852 9.50259L14 5.05ZM12.433 3.75L8.00001 7.42125L3.566 3.75H12.433Z"
                  fill="white"
                />
              </svg>

              <input name="email" type="text" placeholder="Email Address" />

              <input type="submit" value="Subscribe" />
            </form>

            <div className="social-links">
              <Link to="https://facebook.com/TheGUIDON" target="_blank">
                <img src={icon_facebook} alt="Facebook" />
              </Link>
              <Link to="https://x.com/TheGUIDON" target="_blank">
                <img src={icon_twitter} alt="Twitter" />
              </Link>
              <Link to="https://www.instagram.com/theguidon" target="_blank">
                <img src={icon_instagram} alt="Instagram" />
              </Link>
              <Link to="https://www.youtube.com/@TheGuidon" target="_blank">
                <img src={icon_youtube} alt="YouTube" />
              </Link>
              <Link
                to="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT"
                target="_blank"
              >
                <img src={icon_spotify} alt="Spotify" />
              </Link>
            </div>
          </div>
        </div>

        <p className="credits">
          &copy; The GUIDON 2024 All rights reserved. Designed and developed by
          Digital Development 2022–2023 and 2023–2024.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
