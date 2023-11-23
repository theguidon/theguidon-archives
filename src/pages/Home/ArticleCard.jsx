import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <>
      <Link to={article.link} className="flex sm:flex-col flex-row gap-6">
        <div className="lg:mr-4 lg:w-[290px]">
          <div className="lg:w-[18rem] w-[10rem] sm:w-[14rem] aspect-square relative bg-[#cee2fe]">
            <img
              className="max-w-[80%] max-h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={article.picture}
              alt={article.title}
            />
          </div>
        </div>
        <div>
          <h1 className="text-guidon font-tiemposheadline font-bold mt-2">
            {article.title}
          </h1>
          <p className="text-sm font-normal text-[#979797] mt-1 font-chivo uppercase tracking-wide">
            {article.date}
          </p>
          <p className="text-sm mt-1">{article.description}</p>
        </div>
      </Link>
    </>
  );
}
