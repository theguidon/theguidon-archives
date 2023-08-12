import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <>
      <div className="flex lg:flex-col max-sm:flex-row max-sm:gap-6">
        <Link to={article.link} className="lg:mr-4 lg:w-[290px]">
          <div className="lg:w-[18rem] max-sm:w-[160px] max-sm:py-[19.748px] max-sm:px-[37.302px] aspect-square relative bg-[#F6F9FD]">
            <img
              className="lg:w-[10rem] max-sm:w-[112px] max-sm:h-[157.911px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={article.picture}
              alt={article.title}
            />
          </div>
        </Link>
        <div>
          <h1 className="text-guidon font-tiemposheadline font-bold mt-2">
            {article.title}
          </h1>
          <p className="text-xs font-normal text-[#979797] mt-1">
            {article.date}
          </p>
          <p className="text-sm mt-1">{article.description}</p>
        </div>
      </div>
    </>
  );
}
