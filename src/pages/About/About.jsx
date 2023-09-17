import React from "react";
import cover from "../../assets/images/cover.svg";
import mobilecover from "../../assets/images/mobilecover.svg";

export default function About() {
  return (
    <div className="flex flex-col lg:flex-row">
      <img
        src={cover}
        alt="cover"
        className="hidden lg:block object-cover w-[45%]"
      />
      <div className="py-16 px-4 lg:py-[8.44rem] lg:px-16">
        <div className="border-b-2 border-b-lightblue">
          <p className="text-guidon font-chivo font-bold text-base lg:text-lg">
            ABOUT
          </p>
          <h1 className="font-tiemposheadline text-2xl lg:text-5xl font-semibold pt-1">
            The GUIDON Archives
          </h1>
        </div>
        <div className="flex flex-col py-4 gap-6 lg:gap-8 font-chivo text-sm lg:text-xl font-medium text-black">
          <p>
            The Archives is a collection of The GUIDON's published content since
            1929, chronicling its history as the official student publication of
            the Ateneo de Manila University. It contains physical broadsheets,
            magazines, and primers all in one place.
          </p>
          <p>
            In this increasingly digitized sphere, The GUIDON is ensuring that
            its rich historical and contemporary publications remain easily
            accessible to all. Through a digital platform, students and alumni
            can explore the journalism of The GUIDON with just a few clicks.
          </p>
          <p>
            Email{" "}
            <a
              href="mailto:desk@theguidon.com"
              target="_blank"
              className="text-guidon"
            >
              {" "}
              desk@theguidon.com{" "}
            </a>{" "}
            for any comments, suggestions, or inquiries.
          </p>
        </div>
      </div>
      <img src={mobilecover} alt="mobile cover" className="lg:hidden" />
    </div>
  );
}
