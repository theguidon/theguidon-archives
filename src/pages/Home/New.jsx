import React from "react";
import heroImage from "../../assets/images/Broadsheet.png";
import More from "./Buttons/More";
export default function New() {
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
      <img src={heroImage} alt="heroImage" className="my-4" />
    </div>
  );
}
