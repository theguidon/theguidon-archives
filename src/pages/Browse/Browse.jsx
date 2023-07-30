import React, { useState } from "react";
import "./styles.css";

export default function Browse({ title = "The Archive", subtitle = "Browse" }) {
  const [tab, setTab] = useState("All");

  return (
    <div className="px-[6.5rem] py-14">
      <div>
        <h2 className="font-chivo text-guidon uppercase text-lg font-bold leading-5">
          {subtitle}
        </h2>
        <h1 className="font-tiemposheadline text-5xl font-bold leading-[1.4]">
          {title}
        </h1>
      </div>
      <nav className="w-full border-t-[1px] border-solid border-[#72A4D7] pt-4">
        <div className="flex flex-row gap-x-2">
          <Tab text="All" tab={tab} setTab={setTab} />
          <Tab text="Press Issues" tab={tab} setTab={setTab} />
          <Tab text="FreshManual" tab={tab} setTab={setTab} />
          <Tab text="GradMag" tab={tab} setTab={setTab} />
          <Tab text="UAAP Primer" tab={tab} setTab={setTab} />
          <Tab text="Others" tab={tab} setTab={setTab} />
        </div>
        <div>{/* options */}</div>
      </nav>
      <Item />
    </div>
  );
}

function Tab({ text, tab, setTab }) {
  return (
    <button
      onClick={function () {
        setTab(text);
      }}
      className={`px-4 py-2 font-chivo border-solid border-b-[1px] border-${
        tab === text ? "guidon font-bold" : "[#D2DDE5]"
      }`}
    >
      {text}
    </button>
  );
}

function Item({ src, title, date, desc }) {
  return <div></div>;
}
