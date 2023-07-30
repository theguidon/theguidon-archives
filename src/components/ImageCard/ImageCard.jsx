import React from "react";

export default function ImageCard({ image }) {
  return (
    <div className="relative w-[18rem] aspect-square bg-[#EFF5FA]">
      <img
        src={image}
        alt=""
        className="w-[10rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
