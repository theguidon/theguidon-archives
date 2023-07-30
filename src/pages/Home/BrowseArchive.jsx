import React from "react";
import { Archives } from "./Files/Browse";
import LeftButton from "./Buttons/LeftButton";

export default function BrowseArchive() {
  const archivesList = Archives.map((article, index) => (
    <div className="mr-6" key={index}>
      <div className="flex border-b-[1px] border-lightblue mb-3">
        <div class="text-2xl font-medium font-tiemposheadline leading-[33.60px] mr-1">
          {article.title}
        </div>
        <div className="flex my-auto">
          <LeftButton />
        </div>
      </div>
      <div
        className="w-[292px] h-[292px]"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${article.picture})`,
        }}
      ></div>
    </div>
  ));

  return (
    <div className="home browse">
      <h1 className="heading-txt">Browse the Archive </h1>
      <div className="flex"> {archivesList}</div>
    </div>
  );
}
