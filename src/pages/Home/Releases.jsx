import React from "react";
import LeftButton from "./Buttons/LeftButton";
import ArticleCard from "./ArticleCard";
import { Articles } from "./Files/Sample";
import { Link } from "react-router-dom";

export default function Releases() {
  const articlesList = Articles.map((article, index) => (
    <ArticleCard article={article} key={index} />
  ));

  return (
    <div className="home releases">
      <p className="text-base text-guidon font-bold uppercase lg:mb-2 font-chivo tracking-wider">
        2022-2023
      </p>
      <Link
        to="recently-uploaded"
        className="flex flex-row items-center py-2 mb-6 border-b-[2px] border-lightblue"
      >
        <div className="flex-2 heading-txt mr-2 leading-[3.5rem]">
          Releases this term
        </div>
        <div className="flex-1 text-2xl text-guidon">
          <LeftButton />
        </div>
      </Link>
      <div className="flex max-sm:gap-6 max-sm:flex-col">{articlesList}</div>
    </div>
  );
}
