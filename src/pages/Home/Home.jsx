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
        className="home header bg-contain w-screen h-[525px] text-[#FFF] bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(158deg, rgba(15, 38, 92, 0.8) 0%, rgba(114, 164, 215, 0) 100%), url(${Articles[0].hero})`,
          backgroundColor: "lightblue",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-full lg:gap-x-24 lg:pt-[72px] lg:pb-[136px]">
          <div className="lg:flex-[2.5] lg:m-auto mt-auto mb-8">
            <div className="inline-block text-lg font-chivo font-bold text-left uppercase width-auto bg-darkblue px-4 lg:mb-8 mb-1 rounded-[23px]">
              Latest Release
            </div>
            <div className="lg:flex block">
              <div className="lg:w-auto w-full">
                <h1 className="lg:text-5xl text-[32px] font-tiemposheadline font-bold lg:mb-6 mb-1 leading-10">
                  {Articles[0].title}
                </h1>
              </div>
            </div>
            <h5 className="text-[1.25rem] text-sm leading-[1.4rem] font-chivo text-left uppercase mb-6 ">
              {Articles[0].date}
            </h5>
            <div className="text-xl text-left font-chivo font-normal mb-10 leading-tight">
              {Articles[0].description}
            </div>
            <ReadNow link={Articles[0].link} />
          </div>
          <div className="flex-[0.75] hidden lg:block">
            <img src={Articles[0].picture} alt={Articles[0].title} />
          </div>
        </div>
      </div>
      <BrowseArchive />
      <Releases />
      <New />
    </>
  );
}
