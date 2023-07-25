import React from "react";

export default function ArticleCard({ article }) {
  return (
    <>
      <div className="mr-4 w-[290px]">
        <div className="h-[295px] px-16 py-10 bg-[#F6F9FD]">
          <img className="h-full" src={article.picture} alt={article.title} />
        </div>
        <h1 className="text-guidon font-tiemposheadline font-bold mt-2">
          {article.title}
        </h1>
        <p className="text-xs font-normal text-[#979797] mt-1">
          {article.date}
        </p>
        <p className="text-sm mt-1">{article.description}</p>
      </div>
    </>
  );
}
