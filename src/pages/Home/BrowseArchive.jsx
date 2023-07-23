import React from "react";
import heroImage from "../../assets/images/Broadsheet.png";

export default function BrowseArchive() {
  return (
    <div className="home browse">
      <h1 className="text-2xl font-tiemposheadline font-bold leading-8 mb-2">
        Browse the Archive{" "}
      </h1>
      <img src={heroImage} alt="heroImage" className="my-4" />
    </div>
  );
}
