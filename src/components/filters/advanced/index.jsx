import React, { useState } from "react";
import "./index.css";
import DateRangeFilter from "../date-range";
import { validateRangeFilter } from "../../../utils";

function AdvancedFiltersGroup(props) {
  const [selectedDecade, setSelectedDecade] = useState(
    Math.floor(
      (props.yearFilter != null ? props.yearFilter : new Date().getFullYear()) /
        10
    ) * 10
  );

  // decade = selecting year
  // year = selecting month
  // month = selecting date
  const [mode, setMode] = useState("from");
  const [step, setStep] = useState("decade");

  const setDate = (mode, step, year, month, day) => {
    /**
     * step
     * 1 year
     * 2 year, month
     * 3 year, month, day
     */

    let val = "";
    if (step == 1) val = `${year}`;
    else if (step == 2) val = `${year}-${month.toString().padStart(2, "0")}`;
    else if (step == 3)
      val = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;

    props.replaceSearchParams([{ key: mode, value: val }]);
  };

  const closeIcon = (
    <svg
      className="close"
      viewBox="0 0 16 16"
      fill="currentColor"
      stroke="currentStroke"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 14.6693C11.6817 14.6693 14.6663 11.6846 14.6663 8.0026C14.6663 4.3206 11.6817 1.33594 7.99967 1.33594C4.31767 1.33594 1.33301 4.3206 1.33301 8.0026C1.33301 11.6846 4.31767 14.6693 7.99967 14.6693Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinejoin="round"
      />
      <path
        d="M9.88535 6.11719L6.11401 9.88852M6.11401 6.11719L9.88535 9.88852"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const getRangeValue = () => {
    if (props.rangeFilter.from == null && props.rangeFilter.until == null) {
      return "Date Range";
    }

    const parser = (vals) => {
      if (vals.step == 1) {
        return `${vals.year}`;
      } else if (vals.step == 2) {
        return `${vals.month.toString().padStart(2, "0")}/${vals.year}`;
      } else if (vals.step == 3) {
        return `${vals.month.toString().padStart(2, "0")}/${vals.day
          .toString()
          .padStart(2, "0")}/${vals.year}`;
      }

      return "";
    };

    let els = [];

    if (props.rangeFilter.from != null) {
      els.push(
        <p
          className={`nav-cell ${
            props.activeFilterPopup === "range" && mode == "from"
              ? "active"
              : ""
          }`}
          onClick={() => {
            if (props.activeFilterPopup === "range" && mode == "from")
              props.setActiveFilterPopup(null);
            else {
              setMode("from");
              setStep("decade");
            }
          }}
        >
          From: {parser(props.rangeFilter.from)} {closeIcon}
        </p>
      );
    } else {
      els.push(
        <p
          className={`nav-cell ${
            props.activeFilterPopup === "range" && mode == "from"
              ? "active"
              : ""
          }`}
          onClick={() => {
            if (props.activeFilterPopup === "range" && mode == "from")
              props.setActiveFilterPopup(null);
            else {
              setMode("from");
              setStep("decade");
            }
          }}
        >
          From: earliest {closeIcon}
        </p>
      );
    }

    if (props.rangeFilter.until != null) {
      els.push(
        <p
          className={`nav-cell ${
            props.activeFilterPopup === "range" && mode == "until"
              ? "active"
              : ""
          }`}
          onClick={() => {
            if (props.activeFilterPopup === "range" && mode == "until")
              props.setActiveFilterPopup(null);
            else {
              setMode("until");
              setStep("decade");
            }
          }}
        >
          Until: {parser(props.rangeFilter.until)} {closeIcon}
        </p>
      );
    } else {
      els.push(
        <p
          className={`nav-cell ${
            props.activeFilterPopup === "range" && mode == "until"
              ? "active"
              : ""
          }`}
          onClick={() => {
            if (props.activeFilterPopup === "range" && mode == "until")
              props.setActiveFilterPopup(null);
            else {
              setMode("until");
              setStep("decade");
            }
          }}
        >
          Until: latest {closeIcon}
        </p>
      );
    }

    return (
      <>
        {els.map((el, idx) => (
          <React.Fragment key={`rf-${idx}`}>{el}</React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="advanced-filters">
      <div className="year-filter-container filter-container">
        <div
          className={`popup-container ${
            props.activeFilterPopup === "year" ? "active" : ""
          }`}
        >
          <div className="popup">
            <div className="nav">
              <svg
                className="chevron"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 21"
                fill="currentColor"
                onClick={() => {
                  if (
                    selectedDecade - 10 >=
                    Math.floor(props.minDate.year / 10) * 10
                  )
                    setSelectedDecade((d) => d - 10);
                }}
              >
                <path d="M12.7107 6.6248C13.0182 6.34663 13.0427 5.87114 12.7652 5.56276C12.4878 5.25438 12.0135 5.22989 11.706 5.50806L7.28759 9.50408C6.95661 9.80342 6.95752 10.3244 7.28954 10.6226L11.6693 14.5559C11.9779 14.833 12.452 14.8069 12.7284 14.4975C13.0048 14.1882 12.9787 13.7128 12.6701 13.4357L9.24207 10.357C9.06551 10.1985 9.06503 9.92195 9.24103 9.76277L12.7107 6.6248Z" />
              </svg>

              <p>
                {selectedDecade}–{selectedDecade + 9}
              </p>

              <svg
                className="chevron"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 21"
                fill="currentColor"
                onClick={() => {
                  if (
                    selectedDecade + 10 <
                    Math.floor(props.maxDate.year / 10) * 10 + 10
                  )
                    setSelectedDecade((d) => d + 10);
                }}
              >
                <path d="M7.28934 13.4377C6.98177 13.7159 6.95735 14.1914 7.23479 14.4997C7.51223 14.8081 7.98647 14.8326 8.29404 14.5544L12.7124 10.5584C13.0434 10.2591 13.0425 9.73809 12.7105 9.43992L8.33066 5.50656C8.02212 5.22947 7.54796 5.25563 7.2716 5.56498C6.99524 5.87433 7.02132 6.34973 7.32986 6.62682L10.7579 9.70546C10.9345 9.86402 10.935 10.1405 10.759 10.2997L7.28934 13.4377Z" />
              </svg>
            </div>
            <hr />

            <div className="years">
              {[...Array(10)].map((_, idx) => (
                <p
                  className={`year ${
                    selectedDecade + idx < props.minDate.year ||
                    selectedDecade + idx > props.maxDate.year
                      ? "disabled"
                      : ""
                  } ${
                    props.yearFilter != null &&
                    props.yearFilter == selectedDecade + idx
                      ? "active"
                      : ""
                  }`}
                  key={`year-${selectedDecade + idx}`}
                  onClick={() => {
                    let year = selectedDecade + idx;

                    if (
                      year >= props.minDate.year &&
                      year <= props.maxDate.year
                    ) {
                      if (year == props.yearFilter)
                        props.replaceSearchParams([
                          { key: "year", delete: true },
                        ]);
                      else
                        props.replaceSearchParams([
                          { key: "year", value: year },
                        ]);
                      props.setActiveFilterPopup(null);
                    }
                  }}
                >
                  {selectedDecade + idx}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`filter ${props.yearFilter ? "active" : ""}`}
          onClick={() => {
            if (props.activeFilterPopup === "year")
              props.setActiveFilterPopup(null);
            else props.setActiveFilterPopup("year");
          }}
        >
          {props.yearFilter ? props.yearFilter : "Year"}
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.59368 7.28916C6.3155 6.98159 5.84001 6.95716 5.53163 7.2346C5.22325 7.51204 5.19876 7.98629 5.47693 8.29386L9.47295 12.7122C9.77229 13.0432 10.2933 13.0423 10.5915 12.7103L14.5248 8.33048C14.8019 8.02194 14.7757 7.54778 14.4664 7.27142C14.157 6.99506 13.6816 7.02114 13.4045 7.32968L10.3259 10.7577C10.1674 10.9343 9.89083 10.9348 9.73165 10.7588L6.59368 7.28916Z"
              fill="#1C4480"
            />
          </svg>
        </div>
      </div>

      <div className="range-filter-container filter-container">
        <div
          className={`popup-container ${
            props.activeFilterPopup === "range" ? "active" : ""
          }`}
        >
          <div className="popup">
            <DateRangeFilter
              setActiveFilterPopup={props.setActiveFilterPopup}
              mode={mode}
              setMode={setMode}
              step={step}
              setStep={setStep}
              minDate={props.minDate}
              maxDate={props.maxDate}
              setDate={setDate}
              rangeFilter={props.rangeFilter}
            />
          </div>
        </div>

        <div
          className={`filter ${
            props.rangeFilter.from == null && props.rangeFilter.until == null
              ? ""
              : "active"
          }`}
          onClick={(event) => {
            if (
              event.target != null &&
              event.target.className != null &&
              typeof event.target.className == "string" &&
              event.target.className.includes("nav-cell")
            ) {
              if (props.activeFilterPopup !== "range")
                props.setActiveFilterPopup("range");
            } else {
              if (props.activeFilterPopup === "range")
                props.setActiveFilterPopup(null);
              else {
                setStep("decade");
                props.setActiveFilterPopup("range");
              }
            }
          }}
        >
          {getRangeValue()}
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.59368 7.28916C6.3155 6.98159 5.84001 6.95716 5.53163 7.2346C5.22325 7.51204 5.19876 7.98629 5.47693 8.29386L9.47295 12.7122C9.77229 13.0432 10.2933 13.0423 10.5915 12.7103L14.5248 8.33048C14.8019 8.02194 14.7757 7.54778 14.4664 7.27142C14.157 6.99506 13.6816 7.02114 13.4045 7.32968L10.3259 10.7577C10.1674 10.9343 9.89083 10.9348 9.73165 10.7588L6.59368 7.28916Z"
              fill="#1C4480"
            />
          </svg>
        </div>
      </div>

      <div className="sort-filter-container filter-container">
        <div
          className={`popup-container ${
            props.activeFilterPopup === "sort" ? "active" : ""
          }`}
        >
          <div className="popup">
            <p
              className={props.sortOldestFilter ? "" : "active"}
              onClick={() => {
                props.replaceSearchParams([{ key: "sort", value: "newest" }]);
                props.setActiveFilterPopup(null);
              }}
            >
              Newest first
            </p>
            <p
              className={props.sortOldestFilter ? "active" : ""}
              onClick={() => {
                props.replaceSearchParams([{ key: "sort", value: "oldest" }]);
                props.setActiveFilterPopup(null);
              }}
            >
              Oldest first
            </p>
          </div>
        </div>

        <div
          className={`filter ${props.sortOldestFilter == null ? "" : "active"}`}
          onClick={() => {
            if (props.activeFilterPopup === "sort")
              props.setActiveFilterPopup(null);
            else props.setActiveFilterPopup("sort");
          }}
        >
          {props.sortOldestFilter ? "Oldest first" : "Newest first"}
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.59368 7.28916C6.3155 6.98159 5.84001 6.95716 5.53163 7.2346C5.22325 7.51204 5.19876 7.98629 5.47693 8.29386L9.47295 12.7122C9.77229 13.0432 10.2933 13.0423 10.5915 12.7103L14.5248 8.33048C14.8019 8.02194 14.7757 7.54778 14.4664 7.27142C14.157 6.99506 13.6816 7.02114 13.4045 7.32968L10.3259 10.7577C10.1674 10.9343 9.89083 10.9348 9.73165 10.7588L6.59368 7.28916Z"
              fill="#1C4480"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFiltersGroup;
