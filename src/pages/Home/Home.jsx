import React from "react";
import "../../stylesheets/home.css";
import { Articles } from "./Files/Sample";
import BrowseArchive from "./BrowseArchive";
import New from "./New";
import Releases from "./Releases";
import ReadNow from "./Buttons/ReadNow";

export default function Home() {
  return (
    <>
      <div
        className="home header bg-cover h-full  text-[#FFF]"
        style={{
          backgroundImage: `linear-gradient(158deg, rgba(15, 38, 92, 0.8) 0%, rgba(114, 164, 215, 0) 100%), url(${Articles[0].hero})`,
          backgroundColor: "lightblue",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-full gap-x-24 pt-[72px] pb-[136px]">
          {" "}
          <div className="flex-[2.5] m-auto">
            <div className="inline-block text-lg font-chivo font-bold text-left uppercase width-auto bg-darkblue px-4 mb-8 rounded-[23px]">
              Latest Release
            </div>
            <h1 className="text-[56px] font-tiemposheadline font-bold mb-6 leading-10">
              {Articles[0].title}
            </h1>
            <h5 className="text-base font-chivo text-left uppercase mb-6">
              {Articles[0].date}
            </h5>
            <div className="text-xl text-left font-chivo font-normal mb-10 leading-tight">
              {Articles[0].description}
            </div>
            <ReadNow />
          </div>
          <div className="flex-[0.75]">
            <img
              src={Articles[0].picture}
              alt={Articles[0].title}
              className="block w-full"
            />
          </div>
        </div>
      </div>
      <BrowseArchive />
      <Releases />
      <New />
    </>
  );
}
