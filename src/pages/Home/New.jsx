import React from "react";
import LeftButton from "./Buttons/LeftButton";
import ArticleCard from "./ArticleCard";
import { Articles } from "./Files/Sample";

export default function New() {
  const articlesList = Articles.map((article, index) => (
    <ArticleCard article={article} key={index} />
  ));

  return (
    <div className="home new">
      <div className="text-base text-guidon font-bold uppercase lg:mb-6">
        Recently Uploaded
      </div>
      <div className="flex py-2 mb-6 border-b-[2px] border-lightblue">
        <div className="flex-2 heading-txt mr-2">New on the Archive</div>
        <div className="flex-1 text-2xl text-guidon">
          <LeftButton />
        </div>
      </div>
      <div className="flex max-sm:gap-6 max-sm:flex-col">{articlesList}</div>
    </div>
  );
}
