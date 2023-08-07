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
    <footer className="w-screen bg-guidon lg:flex flex-col justify-center items-center text-white font-chivo hidden gap-y-12 px-[6.5rem] py-14">
      <div className="flex flex-row justify-between w-full border-b-[1px] border-white pb-[5rem] ">
        <div className="flex flex-col w-[23.5rem] gap-y-8 ">
          <img src={logo} alt="The GUIDON" />
          <div className="leading-tight">
            The GUIDON is the official student publication of the Ateneo de
            Manila University.
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="font-bold">BROWSE THE ARCHIVES</div>
          <a href="#">Recently Uploaded</a>
          <a href="#">Releases This Term</a>
          <a href="#">Press Issues</a>
          <a href="#">Graduation Magazines</a>
          <a href="#">Freshmanuals</a>
          <a href="#">UAAP Primers</a>
          <a href="#">Other</a>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="font-bold">MORE FROM THE GUIDON</div>
          <a href="https://theguidon.com/">The GUIDON Main</a>
          <a href="https://interactive.theguidon.com/">
            The GUIDON Interactive
          </a>
          <a href="https://vantage.theguidon.com/">Vantage Magazine</a>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>Subscribe to our newsletter</div>
          {/* form not functional */}
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
            }}
            className="border-[1px] border-current rounded-[3px] pl-3 flex flex-row"
          >
            <img src={email} alt="email" className="mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              name="mail"
              required
              className="bg-guidon text-white outline-none placeholder-white"
            />
            <input
              type="submit"
              value="Subscribe"
              className="bg-white text-guidon p-3 font-bold cursor-pointer"
            />
          </form>
          <div className="flex flex-row gap-x-3 mt-2">
            <a href="https://www.facebook.com/TheGUIDON">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="https://twitter.com/TheGUIDON">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.instagram.com/theguidon">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="#">
              <img src={threads} alt="threads" />
            </a>
            <a href="https://open.spotify.com/show/0t2PxYpSft6HfoPHibwAvT">
              <img src={spotify} alt="spotify" />
            </a>
            <a href="https://www.youtube.com/@TheGuidon">
              <img src={youtube} alt="youtube" />
            </a>
          </div>
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
