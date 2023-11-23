import React from "react";
import "./styles.css";
import logo from "../../assets/images/logo-archive-white.svg";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import instagram from "../../assets/icons/instagram.svg";
import threads from "../../assets/icons/threads.svg";
import spotify from "../../assets/icons/spotify.svg";
import youtube from "../../assets/icons/youtube.svg";
import email from "../../assets/icons/email.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" bg-guidon flex flex-col justify-center items-center text-white font-chivo gap-y-12 p-8 lg:px-[5rem] lg:pt-14 lg:pb-7">
      <div className="flex lg:flex-row flex-col justify-between w-full max-w-[30rem] lg:max-w-[76.5rem] border-b-[1px] border-white lg:pb-20 pb-6 gap-x-8  min-w-[12.75rem]">
        <div className="flex flex-col gap-y-8 w=full lg:max-w-[20rem] flex-shrink-0">
          <Link to="/">
            <img
              src={logo}
              alt="The GUIDON"
              className="w-[12.75rem] lg:w-[17rem]"
            />
          </Link>
          <div className="leading-tight">
            The Archives is a collection of The&nbsp;GUIDON's published content
            since 1929, chronicling its history as the official student
            publication of the Ateneo de Manila University.
          </div>
        </div>
        <div className="lg:flex flex-col gap-y-2 hidden">
          <div className="font-bold">BROWSE THE ARCHIVES</div>
          <Link to="/browse/recently-uploaded">Recently Uploaded</Link>
          <Link to="/browse/releases">Releases This Term</Link>
          <Link to="/browse/press-issues">Press Issues</Link>
          <Link to="/browse/graduation-magazines">Graduation Magazines</Link>
          <Link to="/browse/freshmanuals">Freshmanuals</Link>
          <Link to="/browse/uaap-primers">UAAP Primers</Link>
          <Link to="/browse/other">Other</Link>
        </div>
        <div className="hidden lg:flex flex-col gap-y-2">
          <div className="font-bold">MORE FROM THE GUIDON</div>
          <Link to="https://theguidon.com/" target="_blank">
            The GUIDON Main
          </Link>
          <Link to="https://interactive.theguidon.com/" target="_blank">
            The GUIDON Interactive
          </Link>
          <Link to="https://vantage.theguidon.com/" target="_blank">
            Vantage Magazine
          </Link>
        </div>
        <div className="hidden lg:flex flex-col gap-y-2">
          <div>Subscribe to our newsletter</div>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              fetch(
                "https://script.google.com/macros/s/AKfycbwdn8fWAQePWM5krVdYzwC_ksQ6pRQ561_Y1pIX6xq9fueADpNqIy-j9mJW_5zc99nr/exec",
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then(() => {
                  alert(
                    "Successfully subscribed to The GUIDON's newsletter. Thank you!"
                  );
                  e.target.reset();
                })
                .catch(() => {
                  alert(
                    "An unexpected error has occurred. Please refresh the page and try again later."
                  );
                });
            }}
            className="border-[1px] border-current rounded-[3px] flex flex-row  pl-3 relative py-3 min-w-[19rem]"
          >
            <img src={email} alt="email" className="mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              className="bg-guidon text-white outline-none placeholder-white w-min border-r-white"
            />
            <input
              type="submit"
              value="Subscribe"
              className="bg-white text-guidon font-bold cursor-pointer -ml-20 px-4 py-3 absolute right-0 top-0"
            />
          </form>
          <div className="flex flex-row gap-x-3 mt-2 items-center">
            <Link to="https://www.facebook.com/TheGUIDON" target="_blank">
              <img src={facebook} alt="facebook" />
            </Link>
            <Link to="https://twitter.com/TheGUIDON" target="_blank">
              <img src={twitter} alt="twitter" />
            </Link>
            <Link to="https://www.instagram.com/theguidon" target="_blank">
              <img src={instagram} alt="instagram" />
            </Link>
            <Link to="https://www.threads.net/@theguidon" target="_blank">
              <img src={threads} alt="threads" />
            </Link>
            <Link
              to="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT"
              target="_blank"
            >
              <img src={spotify} alt="spotify" />
            </Link>
            <Link to="https://www.youtube.com/@TheGuidon" target="_blank">
              <img src={youtube} alt="youtube" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 mt-6 items-center lg:hidden">
          <Link to="https://www.facebook.com/TheGUIDON" target="_blank">
            <img src={facebook} alt="facebook" />
          </Link>
          <Link to="https://twitter.com/TheGUIDON" target="_blank">
            <img src={twitter} alt="twitter" />
          </Link>
          <Link to="https://www.instagram.com/theguidon" target="_blank">
            <img src={instagram} alt="instagram" />
          </Link>
          <Link to="https://www.threads.net/@theguidon" target="_blank">
            <img src={threads} alt="threads" />
          </Link>
          <Link
            to="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT"
            target="_blank"
          >
            <img src={spotify} alt="spotify" />
          </Link>
          <Link to="https://www.youtube.com/@TheGuidon" target="_blank">
            <img src={youtube} alt="youtube" />
          </Link>
        </div>
      </div>

      <div className="font-chivo text-sm text-center mt-[-1rem] max-w-[35rem] lg:max-w-none">
        © The GUIDON 2023 All rights reserved. Designed and developed by Digital
        Development 2022-2023 and 2023-2024.
      </div>
    </footer>
  );
}
