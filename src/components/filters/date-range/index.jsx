import { useEffect, useState } from "react";
import "./index.css";

function DateRangeFilter(props) {
  // // decade = selecting year
  // // year = selecting month
  // // month = selecting date
  // const [props.mode, props.setMode] = useState("from");

  const [selectedDecade, setSelectedDecade] = useState(2020);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (selectedYear != null)
      setSelectedDecade(Math.floor(selectedYear / 10) * 10);
  }, [selectedYear]);

  useEffect(() => {
    if (props.rangeFilter != null && props.rangeFilter[props.mode] != null) {
      setSelectedYear(props.rangeFilter[props.mode].year);
      setSelectedMonth(
        props.rangeFilter[props.mode].step >= 2
          ? props.rangeFilter[props.mode].month
          : null
      );
      setSelectedDay(
        props.rangeFilter[props.mode].step >= 3
          ? props.rangeFilter[props.mode].day
          : null
      );
    }

    if (props.rangeFilter != null && props.rangeFilter[props.mode] == null) {
      setSelectedYear(null);
      setSelectedMonth(null);
      setSelectedDay(null);
    }
  }, [props.rangeFilter, props.mode]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const getSelectedNav = () => {
  //   if (props.step == "decade") {
  //     return (
  //       <p>
  //         {selectedDecade}–{selectedDecade + 9}
  //       </p>
  //     );
  //   } else if (props.step == "year") {
  //     return (
  //       <p
  //         className="clickable"
  //         onClick={() => {
  //           props.setStep("decade");
  //         }}
  //       >
  //         {selectedYear}
  //       </p>
  //     );
  //   } else if (props.step == "month") {
  //     return (
  //       <>
  //         <p
  //           className="clickable"
  //           onClick={() => {
  //             props.setStep("year");
  //           }}
  //         >
  //           {months[selectedMonth - 1]}
  //         </p>
  //         <p
  //           className="clickable"
  //           onClick={() => {
  //             props.setStep("decade");
  //           }}
  //         >
  //           {selectedYear}
  //         </p>
  //       </>
  //     );
  //   }

  //   return <></>;
  // };

  const getSelectedContent = () => {
    if (props.step == "decade") {
      return (
        <div className="years">
          {[...Array(10)].map((_, idx) => (
            <p
              className={`year ${
                selectedDecade + idx < props.minDate.year ||
                selectedDecade + idx > props.maxDate.year
                  ? "disabled"
                  : ""
              } ${
                selectedYear != null && selectedYear == selectedDecade + idx
                  ? "active"
                  : ""
              }`}
              key={`year-${selectedDecade + idx}`}
              onClick={() => {
                setSelectedYear(selectedDecade + idx);
                // setSelectedMonth(null);
                // setSelectedDay(null);
                props.setStep("year");

                if (props.mode == "from") {
                  if (
                    props.rangeFilter[props.mode] == null ||
                    props.rangeFilter[props.mode].year != selectedDecade + idx
                  ) {
                    // console.log("changed year");
                    props.setDate(props.mode, 1, selectedDecade + idx, 1, 1);
                  } else {
                    // console.log("unchanged year");
                  }
                } else {
                  if (
                    props.rangeFilter[props.mode] == null ||
                    props.rangeFilter[props.mode].year != selectedDecade + idx
                  ) {
                    // console.log("changed year");
                    props.setDate(props.mode, 1, selectedDecade + idx, 12, 31);
                  } else {
                    // console.log("unchanged year");
                  }
                }
              }}
            >
              {selectedDecade + idx}
            </p>
          ))}
        </div>
      );
    } else if (props.step == "year") {
      return (
        <div className="months">
          {months.map((month, idx) => (
            <p
              className={`month ${
                (selectedYear == props.minDate.year &&
                  idx + 1 < props.minDate.month) ||
                (selectedYear == props.maxDate.year &&
                  idx + 1 > props.maxDate.month)
                  ? "disabled"
                  : ""
              } ${
                selectedMonth != null && selectedMonth == idx + 1
                  ? "active"
                  : ""
              }`}
              key={`month-${idx}`}
              onClick={() => {
                setSelectedMonth(idx + 1);
                // setSelectedDay(null);
                props.setStep("month");

                if (props.mode == "from") {
                  if (
                    props.rangeFilter[props.mode] == null ||
                    props.rangeFilter[props.mode].month != idx + 1
                  ) {
                    // console.log("changed month");
                    props.setDate(props.mode, 2, selectedYear, idx + 1, 1);
                  } else {
                    // console.log("unchanged month");
                  }
                } else {
                  if (
                    props.rangeFilter[props.mode] == null ||
                    props.rangeFilter[props.mode].month != idx + 1
                  ) {
                    // console.log("changed month");
                    props.setDate(
                      props.mode,
                      2,
                      selectedYear,
                      idx + 1,
                      new Date(selectedYear, idx + 1, 0).getDate()
                    );
                  } else {
                    // console.log("unchanged month");
                  }
                }
              }}
            >
              {month.substring(0, 3)}
            </p>
          ))}
        </div>
      );
    } else if (props.step == "month") {
      let dayInWeek = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      let numOfDays = new Date(selectedYear, selectedMonth, 0).getDate();

      return (
        <div className="calendar">
          {days.map((day, idx) => (
            <p className="day-of-week" key={`day-of-week-${idx}`}>
              {day.substring(0, 1)}
            </p>
          ))}

          {[...Array(dayInWeek)].map((_, idx) => (
            <p key={`day-placeholder-${idx}`} />
          ))}

          {[...Array(numOfDays)].map((_, idx) => (
            <p
              className={`day ${
                (selectedYear == props.minDate.year &&
                  selectedMonth == props.minDate.month &&
                  idx + 1 < props.minDate.day) ||
                (selectedYear == props.maxDate.year &&
                  selectedMonth == props.maxDate.month &&
                  idx + 1 > props.maxDate.day)
                  ? "disabled"
                  : ""
              } ${selectedDay == idx + 1 ? "active" : ""}`}
              key={`day-${idx + 1}`}
              onClick={() => {
                setSelectedDay(idx + 1);
                props.setDate(
                  props.mode,
                  3,
                  selectedYear,
                  selectedMonth,
                  idx + 1
                );

                if (props.mode == "from") {
                  props.setMode("until");
                  props.setStep("decade");

                  if (props.rangeFilter.until == null) {
                    setSelectedYear(null);
                    setSelectedMonth(null);
                    setSelectedDay(null);
                  } else {
                    setSelectedYear(props.rangeFilter.until.year);
                    if (props.rangeFilter.until.step >= 2)
                      setSelectedMonth(props.rangeFilter.until.month);
                    if (props.rangeFilter.until.step >= 3)
                      setSelectedDay(props.rangeFilter.until.day);
                  }
                } else {
                  props.setActiveFilterPopup(null);
                }
              }}
            >
              {idx + 1}
            </p>
          ))}
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="nav">
        <svg
          className={`chevron ${
            (props.step == "decade" &&
              selectedDecade - 10 < Math.floor(props.minDate.year / 10) * 10) ||
            (props.step == "year" && selectedYear - 1 < props.minDate.year) ||
            (props.step == "month" &&
              selectedYear == props.minDate.year &&
              selectedMonth - 1 < props.minDate.month)
              ? "disabled"
              : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 21"
          fill="currentColor"
          onClick={() => {
            if (props.step == "decade") {
              setSelectedDecade((d) => d - 10);
            } else if (props.step == "year") {
              setSelectedYear((y) => y - 1);
              setSelectedMonth(null);
            } else if (props.step == "month") {
              if (selectedMonth == 1) {
                setSelectedYear((y) => y - 1);
                setSelectedMonth(12);
              } else {
                setSelectedMonth((m) => m - 1);
              }
            }
          }}
        >
          <path d="M12.7107 6.6248C13.0182 6.34663 13.0427 5.87114 12.7652 5.56276C12.4878 5.25438 12.0135 5.22989 11.706 5.50806L7.28759 9.50408C6.95661 9.80342 6.95752 10.3244 7.28954 10.6226L11.6693 14.5559C11.9779 14.833 12.452 14.8069 12.7284 14.4975C13.0048 14.1882 12.9787 13.7128 12.6701 13.4357L9.24207 10.357C9.06551 10.1985 9.06503 9.92195 9.24103 9.76277L12.7107 6.6248Z" />
        </svg>

        <div className="selected">
          <p className={props.step == "decade" ? "show" : "hide"}>
            {selectedDecade}–{selectedDecade + 9}
          </p>
          <p
            className={`clickable ${props.step == "year" ? "show" : "hide"}`}
            onClick={() => {
              props.setStep("decade");
            }}
          >
            {selectedYear}
          </p>
          <>
            <p
              className={`clickable ${props.step == "month" ? "show" : "hide"}`}
              onClick={() => {
                props.setStep("year");
              }}
            >
              {months[selectedMonth - 1]}
            </p>
            <p
              className={`clickable ${props.step == "month" ? "show" : "hide"}`}
              onClick={() => {
                props.setStep("decade");
              }}
            >
              {selectedYear}
            </p>
          </>
        </div>

        <svg
          className={`chevron ${
            (props.step == "decade" &&
              selectedDecade + 10 >=
                Math.floor(props.maxDate.year / 10) * 10 + 10) ||
            (props.step == "year" && selectedYear + 1 > props.maxDate.year) ||
            (props.step == "month" &&
              selectedYear == props.maxDate.year &&
              selectedMonth + 1 > props.maxDate.month)
              ? "disabled"
              : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 21"
          fill="currentColor"
          onClick={() => {
            if (props.step == "decade") {
              setSelectedDecade((d) => d + 10);
            } else if (props.step == "year") {
              setSelectedYear((y) => y + 1);
              setSelectedMonth(null);
            } else if (props.step == "month") {
              if (selectedMonth == 12) {
                setSelectedYear((y) => y + 1);
                setSelectedMonth(1);
              } else {
                setSelectedMonth((m) => m + 1);
              }
            }
          }}
        >
          <path d="M7.28934 13.4377C6.98177 13.7159 6.95735 14.1914 7.23479 14.4997C7.51223 14.8081 7.98647 14.8326 8.29404 14.5544L12.7124 10.5584C13.0434 10.2591 13.0425 9.73809 12.7105 9.43992L8.33066 5.50656C8.02212 5.22947 7.54796 5.25563 7.2716 5.56498C6.99524 5.87433 7.02132 6.34973 7.32986 6.62682L10.7579 9.70546C10.9345 9.86402 10.935 10.1405 10.759 10.2997L7.28934 13.4377Z" />
        </svg>
      </div>

      <hr />

      <div className={`years ${props.step == "decade" ? "show-grid" : "hide"}`}>
        {[...Array(10)].map((_, idx) => (
          <p
            className={`year ${
              selectedDecade + idx < props.minDate.year ||
              selectedDecade + idx > props.maxDate.year
                ? "disabled"
                : ""
            } ${
              selectedYear != null && selectedYear == selectedDecade + idx
                ? "active"
                : ""
            }`}
            key={`year-${selectedDecade + idx}`}
            onClick={() => {
              setSelectedYear(selectedDecade + idx);
              // setSelectedMonth(null);
              // setSelectedDay(null);
              props.setStep("year");

              if (props.mode == "from") {
                if (
                  props.rangeFilter[props.mode] == null ||
                  props.rangeFilter[props.mode].year != selectedDecade + idx
                ) {
                  // console.log("changed year");
                  props.setDate(props.mode, 1, selectedDecade + idx, 1, 1);
                } else {
                  // console.log("unchanged year");
                }
              } else {
                if (
                  props.rangeFilter[props.mode] == null ||
                  props.rangeFilter[props.mode].year != selectedDecade + idx
                ) {
                  // console.log("changed year");
                  props.setDate(props.mode, 1, selectedDecade + idx, 12, 31);
                } else {
                  // console.log("unchanged year");
                }
              }
            }}
          >
            {selectedDecade + idx}
          </p>
        ))}
      </div>
      <div className={`months ${props.step == "year" ? "show-grid" : "hide"}`}>
        {months.map((month, idx) => (
          <p
            className={`month ${
              (selectedYear == props.minDate.year &&
                idx + 1 < props.minDate.month) ||
              (selectedYear == props.maxDate.year &&
                idx + 1 > props.maxDate.month)
                ? "disabled"
                : ""
            } ${
              selectedMonth != null && selectedMonth == idx + 1 ? "active" : ""
            }`}
            key={`month-${idx}`}
            onClick={() => {
              setSelectedMonth(idx + 1);
              // setSelectedDay(null);
              props.setStep("month");

              if (props.mode == "from") {
                if (
                  props.rangeFilter[props.mode] == null ||
                  props.rangeFilter[props.mode].month != idx + 1
                ) {
                  // console.log("changed month");
                  props.setDate(props.mode, 2, selectedYear, idx + 1, 1);
                } else {
                  // console.log("unchanged month");
                }
              } else {
                if (
                  props.rangeFilter[props.mode] == null ||
                  props.rangeFilter[props.mode].month != idx + 1
                ) {
                  // console.log("changed month");
                  props.setDate(
                    props.mode,
                    2,
                    selectedYear,
                    idx + 1,
                    new Date(selectedYear, idx + 1, 0).getDate()
                  );
                } else {
                  // console.log("unchanged month");
                }
              }
            }}
          >
            {month.substring(0, 3)}
          </p>
        ))}
      </div>
      <div
        className={`calendar ${props.step == "month" ? "show-grid" : "hide"}`}
      >
        {days.map((day, idx) => (
          <p className="day-of-week" key={`day-of-week-${idx}`}>
            {day.substring(0, 1)}
          </p>
        ))}

        {[...Array(new Date(selectedYear, selectedMonth - 1, 1).getDay())].map(
          (_, idx) => (
            <p key={`day-placeholder-${idx}`} />
          )
        )}

        {[...Array(new Date(selectedYear, selectedMonth, 0).getDate())].map(
          (_, idx) => (
            <p
              className={`day ${
                (selectedYear == props.minDate.year &&
                  selectedMonth == props.minDate.month &&
                  idx + 1 < props.minDate.day) ||
                (selectedYear == props.maxDate.year &&
                  selectedMonth == props.maxDate.month &&
                  idx + 1 > props.maxDate.day)
                  ? "disabled"
                  : ""
              } ${selectedDay == idx + 1 ? "active" : ""}`}
              key={`day-${idx + 1}`}
              onClick={() => {
                setSelectedDay(idx + 1);
                props.setDate(
                  props.mode,
                  3,
                  selectedYear,
                  selectedMonth,
                  idx + 1
                );

                if (props.mode == "from") {
                  props.setMode("until");
                  props.setStep("decade");

                  if (props.rangeFilter.until == null) {
                    setSelectedYear(null);
                    setSelectedMonth(null);
                    setSelectedDay(null);
                  } else {
                    setSelectedYear(props.rangeFilter.until.year);
                    if (props.rangeFilter.until.step >= 2)
                      setSelectedMonth(props.rangeFilter.until.month);
                    if (props.rangeFilter.until.step >= 3)
                      setSelectedDay(props.rangeFilter.until.day);
                  }
                } else {
                  props.setActiveFilterPopup(null);
                }
              }}
            >
              {idx + 1}
            </p>
          )
        )}
      </div>
    </>
  );
}

export default DateRangeFilter;
