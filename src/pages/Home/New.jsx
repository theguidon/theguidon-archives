import React from "react";
import More from "./Buttons/More";
import { Articles } from "./Files/Sample";

export default function New() {
  const articlesList = Articles.map((article, index) => (
    <div className="leading-tight mr-2" key={index}>
      <img src={article.picture} alt={article.title} />
      <h1 className="sm-txt font-bold mt-1">{article.title}</h1>
      <p className="xs-txt">{article.description}</p>
      <p className="xs-txt font-bold text-[#979797] uppercase mt-1">
        {article.date}
      </p>
    </div>
  ));

  return (
    <div className="home new">
      <div className="flex">
        <div className="flex-2">
          <h1 className="flex text-2xl font-bold leading-8">
            What's New on the Archive?{" "}
          </h1>
          <div className="xs-txt sm-guidon text-guidon font-bold uppercase">
            Recently Uploaded
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
