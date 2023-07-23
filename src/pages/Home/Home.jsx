import React from "react";
import "../../stylesheets/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Articles } from "./Files/Sample";

import BrowseArchive from "./BrowseArchive";
import New from "./New";
import Releases from "./Releases";

export default function Home() {
  const articlesList = Articles.map((article, index) => (
    <SwiperSlide key={index}>
      <div
        className="home header bg-cover h-[382px] text-[#FFF]"
        style={{
          backgroundImage: `linear-gradient(158deg, rgba(15, 38, 92, 0.8) 0%, rgba(114, 164, 215, 0) 100%), url(${article.hero})`,
          backgroundColor: "#72A4D7",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex">
          {" "}
          <div className="flex-1 p-1">
            <div className="xs-txt relative font-chivo font-bold text-left uppercase">
              Latest Release
            </div>
            <h1 className="relative text-2xl font-bold leading-8">
              {article.title}
            </h1>
            <h5 className="xs-txt relative font-chivo text-left uppercase">
              {article.date}
            </h5>
            <div className="sm-txt relative font-light text-left leading-tight">
              {article.description}
            </div>
            <button className="btn-blue-light text-guidon font-bold mt-4">
              Read now
            </button>
          </div>
          <div className="flex-1 p-1 flex items-center justify-center">
            <img
              src={article.picture}
              alt={article.title}
              class="block my-auto"
            />
          </div>
        </div>
      </div>
    </SwiperSlide>
  ));
  return (
    <>
      <div>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {articlesList}
        </Swiper>
      </div>
      <BrowseArchive />
      <New />
      <Releases />
    </>
  );
}
