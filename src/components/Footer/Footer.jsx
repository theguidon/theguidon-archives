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

export default function Footer() {
  return (
    <footer className="w-screen bg-guidon flex flex-col justify-center items-center text-white font-chivo gap-y-12 p-8 lg:px-[5rem] lg:pt-14 lg:pb-7">
      <div className="flex lg:flex-row flex-col justify-center w-full border-b-[1px] border-white lg:pb-20 pb-6 gap-x-16  min-w-[12.75rem]">
        <div className="flex flex-col gap-y-8 w-[50rem]">
          <img
            src={logo}
            alt="The GUIDON"
            className="w-[12.75rem] lg:w-[17rem] flex-shrink-0"
          />
          <div className="leading-tight">
            The Archives is a collection of The GUIDON's published content since
            1929, chronicling its history as the official student publication of
            the Ateneo de Manila University.
          </div>
        </div>
        <div className="lg:flex flex-col gap-y-2 hidden">
          <div className="font-bold">BROWSE THE ARCHIVES</div>
          <a href="/">Recently Uploaded</a>
          <a href="/">Releases This Term</a>
          <a href="/">Press Issues</a>
          <a href="/">Graduation Magazines</a>
          <a href="/">Freshmanuals</a>
          <a href="/">UAAP Primers</a>
          <a href="/">Other</a>
        </div>
        <div className="hidden lg:flex flex-col gap-y-2">
          <div className="font-bold">MORE FROM THE GUIDON</div>
          <a href="https://theguidon.com/" target="_blank">
            The GUIDON Main
          </a>
          <a href="https://interactive.theguidon.com/" target="_blank">
            The GUIDON Interactive
          </a>
          <a href="https://vantage.theguidon.com/" target="_blank">
            Vantage Magazine
          </a>
        </div>
        <div className="hidden lg:flex flex-col gap-y-2">
          <div>Subscribe to our newsletter</div>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
            }}
            className="border-[1px] border-current rounded-[3px] flex flex-row  pl-3 relative py-3 min-w-[19rem]"
          >
            <img src={email} alt="email" className="mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              name="mail"
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
            <a href="https://www.facebook.com/TheGUIDON" target="_blank">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="https://twitter.com/TheGUIDON" target="_blank">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.instagram.com/theguidon" target="_blank">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="https://www.threads.net/@theguidon" target="_blank">
              <img src={threads} alt="threads" />
            </a>
            <a
              href="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT"
              target="_blank"
            >
              <img src={spotify} alt="spotify" />
            </a>
            <a href="https://www.youtube.com/@TheGuidon" target="_blank">
              <img src={youtube} alt="youtube" />
            </a>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 mt-6 items-center lg:hidden">
          <a href="https://www.facebook.com/TheGUIDON" target="_blank">
            <img src={facebook} alt="facebook" />
          </a>
          <a href="https://twitter.com/TheGUIDON" target="_blank">
            <img src={twitter} alt="twitter" />
          </a>
          <a href="https://www.instagram.com/theguidon" target="_blank">
            <img src={instagram} alt="instagram" />
          </a>
          <a href="https://www.threads.net/@theguidon" target="_blank">
            <img src={threads} alt="threads" />
          </a>
          <a
            href="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT"
            target="_blank"
          >
            <img src={spotify} alt="spotify" />
          </a>
          <a href="https://www.youtube.com/@TheGuidon" target="_blank">
            <img src={youtube} alt="youtube" />
          </a>
        </div>
      </div>

      <div className="font-chivo text-sm text-center mt-[-1rem]">
        © The GUIDON 2023 All rights reserved. Designed and developed by Digital
        Development 2022-2023 and 2023-2024.
      </div>
    </footer>
  );
}
//flex py-2 mb-6 border-b-[1px] border-lightblue
