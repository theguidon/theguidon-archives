import React from "react";
import LeftButton from "./Buttons/LeftButton";
import ArticleCard from "./ArticleCard";
import { Articles } from "./Files/Sample";

export default function Releases() {
  const articlesList = Articles.map((article, index) => (
    <ArticleCard article={article} key={index} />
  ));

  return (
    <div className="home releases">
      <div className="text-base text-guidon font-bold uppercase mb-6">
        2022-2023
      </div>
      <div className="flex py-2 mb-6 border-b-[1px] border-lightblue">
        <div className="flex-2 heading-txt mr-2">Releases This Term</div>
        <div className="flex-1 text-2xl text-guidon">
          <LeftButton />
        </div>
      </div>
      <div className="flex">{articlesList}</div>
    </div>
  );
}
