import React from "react";
import heroImage from "../../assets/home/hero.png";
import "../../stylesheets/home.css";
export default function Home() {
  return (
    <>
      <div className="home header">
        <div className="flex">
          <div className="flex-1 p-1">
            <div className="xs-txt relative font-chivo font-bold text-left uppercase">
              Latest Release
            </div>
            <h1 className="relative text-2xl leading-8 text-black">
              November- December 2022{" "}
            </h1>
            <h5 className="xs-txt relative font-chivo text-left uppercase">
              December 31,2023
            </h5>
            <div className="relative font-light text-[12px] text-left leading-tight">
              With 2022 nearing its end, The GUIDON takes a look at the events,
              issues, and developments that have come to define the past year.{" "}
            </div>
            <button className="btn-blue-light text-guidon font-bold my-4">
              Read now
            </button>
          </div>
          <div className="flex-1 p-1 flex items-center justify-center">
            <img src={heroImage} alt="hero" class="block my-auto" />
          </div>
        </div>
      </div>
      <Browse />
    </>
  );
}
