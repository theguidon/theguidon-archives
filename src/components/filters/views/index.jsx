import "./index.css";

function ViewsFilterGroup(props) {
  return (
    <div className="views-group">
      <svg
        className={`view ${props.isGridView ? "active" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        onClick={() => {
          props.replaceSearchParams([{ key: "view", value: "grid" }]);
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 18C25.1046 18 26 18.8954 26 20V24C26 25.1046 25.1046 26 24 26H20C18.8954 26 18 25.1046 18 24V20C18 18.8954 18.8954 18 20 18H24ZM12 18C13.1046 18 14 18.8954 14 20V24C14 25.1046 13.1046 26 12 26H8C6.89543 26 6 25.1046 6 24V20C6 18.8954 6.89543 18 8 18H12ZM12 6C13.1046 6 14 6.89543 14 8V12C14 13.1046 13.1046 14 12 14H8C6.89543 14 6 13.1046 6 12V8C6 6.89543 6.89543 6 8 6H12ZM24 6C25.1046 6 26 6.89543 26 8V12C26 13.1046 25.1046 14 24 14H20C18.8954 14 18 13.1046 18 12V8C18 6.89543 18.8954 6 20 6H24Z"
        />
      </svg>

      <svg
        className={`view ${props.isGridView ? "" : "active"}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        onClick={() => {
          props.replaceSearchParams([{ key: "view", value: "list" }]);
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 12C26 13.1046 25.1046 14 24 14H8C6.89543 14 6 13.1046 6 12V8C6 6.89543 6.89543 6 8 6H24C25.1046 6 26 6.89543 26 8V12ZM26 24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V20C6 18.8954 6.89543 18 8 18H24C25.1046 18 26 18.8954 26 20V24Z"
        />
      </svg>
    </div>
  );
}

export default ViewsFilterGroup;
