import React from "react";
import { Archives } from "./Files/Browse";
import LeftButton from "./Buttons/LeftButton";
import { Link } from "react-router-dom";

export default function BrowseArchive() {
  const archivesList = Archives.map((article, index) => (
    <Link
      to={article.link}
      className="lg:mr-6  px-6 py-[10px] rounded-lg bg-white shadow-md"
      key={index}
    >
      <div className="flex border-b-[1px] border-lightblue mb-3">
        <div className="lg:text-2xl text-xl font-medium font-tiemposheadline leading-[33.60px] mr-1">
          {article.title}
        </div>
        <div className="flex my-auto">
          <LeftButton />
        </div>
      </div>
      <div
        className="lg:w-[292px] lg:h-[292px] w-full h-[156px] bg-center"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${article.picture})`,
        }}
      ></div>
    </Link>
  ));

  return (
    <div className="home browse">
      <h1 className="heading-txt border-b-2 border-lightblue pb-2 mb-6">
        Browse the Archive{" "}
      </h1>
      <div className="lg:flex flex-wrap"> {archivesList}</div>
    </div>
  );
}
