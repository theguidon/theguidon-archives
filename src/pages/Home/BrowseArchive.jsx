import React from "react";
import { Archives } from "./Files/Browse";
import { LiaArrowAltCircleRightSolid } from "react-icons/lia";

export default function BrowseArchive() {
  const archivesList = Archives.map((article, index) => (
    <div key={index}>
      <div
        className="w-[218.38px] h-[303.31px] flex mr-8 p-4 font-chivo text-white"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${article.picture})`,
        }}
      >
        <div className="flex mt-auto">
          <div className="flex-2 mr-2 leading-3">
            <h1 className="text-m font-bold">Read</h1>
            <h1 className=" text-xl uppercase font-bold">{article.title}</h1>
          </div>
          <div className="flex-1 font-bold text-[24px] my-auto">
            <LiaArrowAltCircleRightSolid />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="home browse">
      <h1 className="heading-txt">Browse the Archive </h1>
      <div className="flex overflow-x-scroll"> {archivesList}</div>
    </div>
  );
}
