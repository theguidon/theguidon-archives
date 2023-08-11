import React from "react";
import cover from "../../assets/images/cover.svg";

export default function About() {
  return (
    <div className="flex flex-row">
      <img src={cover} alt="cover" />
      <div className="flex flex-col mt-[8.44rem] ml-[4rem] mr-[6.5rem] mb-[8.37rem] gap-6">
        <div>
          <p className="text-guidon font-chivo font-bold text-lg">ABOUT</p>
          <h1 className="font-tiemposheadline text-5xl font-semibold pt-1">The GUIDON Archives</h1>
        </div>
        <div className="flex flex-col gap-8 self-stretch py-px text-chivo text-xl font-medium text-black">
          <p>
            The Archives is a collection of The GUIDON's published content since 1929, chronicling its history as the
            official student publication of the Ateneo de Manila University. 
            It contains physical broadsheets, magazines, and primers all in one place.
          </p>
         <p>
          In this increasingly digitized sphere, The GUIDON is ensuring that its rich historical and contemporary publications remain easily accessible to all.
          Through a digital platform, students and alumni can explore the journalism of The GUIDON with just a few clicks.
         </p>
         <p>
          Email <span className="text-guidon"> desk@theguidon.com </span> for any comments, suggestions, or inquiries.
         </p>
        </div>
    </div>
  </div>
  );
}
