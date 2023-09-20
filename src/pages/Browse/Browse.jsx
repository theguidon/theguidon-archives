import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

export default function Browse({ title = "The Archive", subtitle = "Browse" }) {
  console.log(useParams().type);
  let type = useParams().type;
  const [tab, setTab] = useState(type === undefined ? "" : type);

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
      <nav className="w-full border-t-[1px] border-solid border-[#72A4D7] py-4">
        <div className="flex flex-row gap-x-2">
          <Tab text="All" param="" tab={tab} setTab={setTab} />
          <Tab
            text="Press Issues"
            param="press-issues"
            tab={tab}
            setTab={setTab}
          />
          <Tab
            text="FreshManual"
            param="freshmanuals"
            tab={tab}
            setTab={setTab}
          />
          <Tab
            text="GradMag"
            param="graduation-magazines"
            tab={tab}
            setTab={setTab}
          />
          <Tab
            text="UAAP Primer"
            param="uaap-primers"
            tab={tab}
            setTab={setTab}
          />
          <Tab text="Others" param="others" tab={tab} setTab={setTab} />
        </div>
        <div>{/* options */}</div>
      </nav>
      {tab === "" || tab === "freshmanuals" ? (
        <Item
          img="/freshmanual-2023.png"
          title="FreshManual 2023"
          date="7 August 2023"
          link="/issues/freshmanual-2023"
        />
      ) : null}
    </div>
  );
}

function Tab({ text, tab, setTab, param }) {
  return (
    <button
      onClick={function () {
        setTab(param);
      }}
      className={`px-4 py-2 font-chivo border-solid border-b-[1px] border-${
        tab === param ? "guidon font-bold" : "[#D2DDE5]"
      }`}
    >
      {text}
    </button>
  );
}

function Item({ img, title, date, desc, link }) {
  return (
    <Link to={link}>
      <div className="relative w-80 aspect-square bg-[#ddebff] mb-3">
        <img
          src={img}
          alt=""
          className="absolute w-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <p className="font-tiemposheadline text-guidon text-xl leading-6 font-bold">
        {title}
      </p>
      <p>{date}</p>
      <p>{desc}</p>
    </Link>
  );
}
