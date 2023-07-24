import React from "react";
import More from "./Buttons/More";
import { Articles } from "./Files/Sample";

export default function Releases() {
  const articlesList = Articles.map((article, index) => (
    <div className="leading-tight mr-2" key={index}>
      <img src={article.picture} alt={article.title} />
      <h1 className="sm-txt font-tiemposheadline font-bold mt-1">
        {article.title}
      </h1>
      <p className="xxs-txt">{article.description}</p>
      <p className="xxs-txt font-bold text-[#979797] uppercase mt-1">
        {article.date}
      </p>
    </div>
  ));

  return (
    <div className="home releases">
      <div className="flex">
        <div className="flex-2">
          <h1 className="heading-txt">Releases This Term </h1>
          <div className="sm-txt text-guidon font-bold uppercase">
            2022-2023
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <More />
        </div>
      </div>
      <div className="flex">{articlesList}</div>
    </div>
  );
}
