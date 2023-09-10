import React from "react";
import { Archives } from "./Files/Browse";
import LeftButton from "./Buttons/LeftButton";
import { Link } from "react-router-dom";

export default function BrowseArchive() {
  const archivesList = Archives.map((article, index) => (
    <Link
      to={article.link}
      className="lg:mr-6  max-sm:px-6 max-sm:py-[10px] max-sm:rounded-lg max-sm:bg-white max-sm:shadow-md"
      key={index}
    >
      <div className="flex border-b-[1px] border-lightblue mb-3">
        <div className="text-2xl max-sm:text-xl font-medium font-tiemposheadline leading-[33.60px] mr-1">
          {article.title}
        </div>
        <div className="flex my-auto">
          <LeftButton />
        </div>
      </div>
      <div
        className="w-[292px] h-[292px] max-sm:w-full max-sm:h-[156px] bg-center"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${article.picture})`,
        }}
      ></div>
    </Link>
  ));

  return (
    <div className="home browse">
      <h1 className="heading-txt max-sm:border-b-2 max-sm:border-lightblue max-sm:pb-2 mb-6">
        Browse the Archive{" "}
      </h1>
      <div className="lg:flex"> {archivesList}</div>
    </div>
  );
}
