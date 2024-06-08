import { useEffect, useState } from "react";
import "./index.css";

function DateRangeFilter(props) {
  // decade = selecting year
  // year = selecting month
  // month = selecting date
  const [mode, setMode] = useState("from");
  const [step, setStep] = useState("decade");

  const [selectedDecade, setSelectedDecade] = useState(2020);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (selectedYear != null)
      setSelectedDecade(Math.floor(selectedYear / 10) * 10);
  }, [selectedYear]);

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

  const getSelectedNav = () => {
    if (step == "decade") {
      return (
        <p>
          {selectedDecade}–{selectedDecade + 9}
        </p>
      );
    } else if (step == "year") {
      return (
        <p
          className="clickable"
          onClick={() => {
            setStep("decade");
          }}
        >
          {selectedYear}
        </p>
      );
    } else if (step == "month") {
      return (
        <>
          <p
            className="clickable"
            onClick={() => {
              setStep("year");
            }}
          >
            {months[selectedMonth - 1]}
          </p>
          <p
            className="clickable"
            onClick={() => {
              setStep("decade");
            }}
          >
            {selectedYear}
          </p>
        </>
      );
    }

    return <></>;
  };

  const getSelectedContent = () => {
    if (step == "decade") {
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
                setSelectedMonth(null);
                setSelectedDay(null);
                setStep("year");
              }}
            >
              {selectedDecade + idx}
            </p>
          ))}
        </div>
      );
    } else if (step == "year") {
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
                setSelectedDay(null);
                setStep("month");
              }}
            >
              {month.substring(0, 3)}
            </p>
          ))}
        </div>
      );
    } else if (step == "month") {
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
                props.setDate(mode, selectedYear, selectedMonth, idx + 1);
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
            (step == "decade" &&
              selectedDecade - 10 < Math.floor(props.minDate.year / 10) * 10) ||
            (step == "year" && selectedYear - 1 < props.minDate.year) ||
            (step == "month" &&
              selectedYear == props.minDate.year &&
              selectedMonth - 1 < props.minDate.month)
              ? "disabled"
              : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 21"
          fill="currentColor"
          onClick={() => {
            if (step == "decade") {
              setSelectedDecade((d) => d - 10);
            } else if (step == "year") {
              setSelectedYear((y) => y - 1);
              setSelectedMonth(null);
            } else if (step == "month") {
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

        <div className="selected">{getSelectedNav()}</div>

        <svg
          className={`chevron ${
            (step == "decade" &&
              selectedDecade + 10 >=
                Math.floor(props.maxDate.year / 10) * 10 + 10) ||
            (step == "year" && selectedYear + 1 > props.maxDate.year) ||
            (step == "month" &&
              selectedYear == props.maxDate.year &&
              selectedMonth + 1 > props.maxDate.month)
              ? "disabled"
              : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 21"
          fill="currentColor"
          onClick={() => {
            if (step == "decade") {
              setSelectedDecade((d) => d + 10);
            } else if (step == "year") {
              setSelectedYear((y) => y + 1);
              setSelectedMonth(null);
            } else if (step == "month") {
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

      {getSelectedContent()}
    </>
  );
}

export default DateRangeFilter;
