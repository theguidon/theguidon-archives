import React from "react";
import logo from "../assets/images/logo.svg";
import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
import instagram from "../assets/icons/instagram.svg";
import spotify from "../assets/icons/spotify.svg";
import youtube from "../assets/icons/youtube.svg";

export default function Footer() {
  return (
    <footer className="w-screen h-[21rem] lg:flex flex-col justify-center items-center text-[#1C4480] font-chivo hidden gap-y-12 mb-12 shadow-[0_8px_35px_0_rgba(0,0,0,0.10)]">
      <div className="flex flex-row gap-x-[6rem]">
        <div className="flex flex-col w-[23.5rem] gap-y-8">
          <img src={logo} alt="The GUIDON" />
          <div className="leading-tight">
            The GUIDON is the official student publication of the Ateneo de
            Manila University.
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>More from The GUIDON</div>
          <a href="https://theguidon.com/" className="font-bold">
            The GUIDON
          </a>
          <a href="https://interactive.theguidon.com/" className="font-bold">
            INTERACTIVES
          </a>
          <a href="https://vantage.theguidon.com/" className="font-bold">
            VANTAGE MAGAZINE
          </a>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>Subscribe to our newsletter</div>
          {/* form not functional */}
          <form
            action=""
            className="border-[1px] border-current rounded-[3px] pl-3 flex flex-row"
          >
            <input
              type="email"
              placeholder="Email Address"
              name="mail"
              required
              className="text-current"
            />
            <input
              type="submit"
              value="Subscribe"
              className="bg-[#1C4480] text-white p-3 font-bold"
            ></input>
          </form>
          <div className="flex flex-row gap-x-3 mt-2">
            <a href="https://www.facebook.com/TheGUIDON">
              <img src={facebook} alt="" />
            </a>
            <a href="https://twitter.com/TheGUIDON">
              <img src={twitter} alt="" />
            </a>
            <a href="https://www.instagram.com/theguidon">
              <img src={instagram} alt="" />
            </a>
            <a href="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT">
              <img src={spotify} alt="" />
            </a>
            <a href="https://www.youtube.com/@TheGuidon">
              <img src={youtube} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="font-chivo text-sm text-center border-t-[1px] border-[#1C4480] pt-[1.5rem]">
        © The GUIDON 2023 All rights reserved. Designed and developed by Digital
        Development 2022-2024
      </div>
    </footer>
  );
}
