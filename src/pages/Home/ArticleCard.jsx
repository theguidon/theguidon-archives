import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <>
      <Link to={article.link} className="mr-4 w-[290px]">
        <div className="w-[18rem] aspect-square relative bg-[#F6F9FD]">
          <img
            className="w-[10rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={article.picture}
            alt={article.title}
          />
        </div>
        <h1 className="text-guidon font-tiemposheadline font-bold mt-2">
          {article.title}
        </h1>
        <p className="text-xs font-normal text-[#979797] mt-1">
          {article.date}
        </p>
        <p className="text-sm mt-1">{article.description}</p>
      </Link>
    </>
  );
}
