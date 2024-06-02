import "./index.css";

function AdvancedFiltersGroup(props) {
  return (
    <div className="advanced-filters">
      <div className="year-filter-container filter-container">
        <div
          className={`popup-container ${
            props.activeFilterPopup === "year" ? "active" : ""
          }`}
        >
          <div className="popup">POPUP</div>
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
              className={
                props.sortOldestFilter == null
                  ? ""
                  : props.sortOldestFilter
                  ? "active"
                  : ""
              }
              onClick={() => {
                if (props.sortOldestFilter === true)
                  props.setSortOldestFilter(null);
                else props.setSortOldestFilter(true);
                props.setActiveFilterPopup(null);
              }}
            >
              Oldest first
            </p>
            <p
              className={
                props.sortOldestFilter == null
                  ? ""
                  : props.sortOldestFilter
                  ? ""
                  : "active"
              }
              onClick={() => {
                if (props.sortOldestFilter === false)
                  props.setSortOldestFilter(null);
                else props.setSortOldestFilter(false);
                props.setActiveFilterPopup(null);
              }}
            >
              Newest first
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
          {props.sortOldestFilter == null
            ? "Sort by"
            : props.sortOldestFilter
            ? "Oldest first"
            : "Newest first"}
          <svg
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
