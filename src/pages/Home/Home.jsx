import React from "react";
import heroImage from "../../assets/images/Hero.png";
import "../../stylesheets/home.css";
import Broadsheet from "../../assets/images/Broadsheet.png";

import BrowseArchive from "./BrowseArchive";
import New from "./New";
import Releases from "./Releases";
export default function Home() {
  return (
    <>
      <div
        className="home header bg-cover text-[#FFF]"
        style={{
          backgroundImage: `linear-gradient(158deg, rgba(15, 38, 92, 0.8) 0%, rgba(114, 164, 215, 0) 100%), url(${heroImage})`,
          backgroundColor: "#72A4D7",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex">
          {" "}
          <div className="flex-1 p-1">
            <div className="xs-txt relative font-chivo font-bold text-left uppercase">
              Latest Release
            </div>
            <h1 className="relative text-2xl font-bold leading-8">
              November- December 2022{" "}
            </h1>
            <h5 className="xs-txt relative font-chivo text-left uppercase">
              December 31,2023
            </h5>
            <div className="sm-txt relative font-light text-left leading-tight">
              With 2022 nearing its end, The GUIDON takes a look at the events,
              issues, and developments that have come to define the past year.{" "}
            </div>
            <button className="btn-blue-light text-guidon font-bold my-4">
              Read now
            </button>
          </div>
          <div className="flex-1 p-1 flex items-center justify-center">
            <img src={Broadsheet} alt="hero" class="block my-auto" />
          </div>
        </div>
      </div>
      <BrowseArchive />
      <New />
      <Releases />
    </>
  );
}
