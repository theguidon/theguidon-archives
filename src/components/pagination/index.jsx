import "./index.css";

function Pagination(props) {
  return (
    <div className="pagination">
      <div
        className={props.pageNums[0] == props.page ? "hide" : ""}
        onClick={() => {
          props.setPage(props.page - 1);
        }}
      >
        <svg
          className="arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 10C18 10.5523 17.5523 11 17 11H5.415L7.70711 13.2929C8.06759 13.6534 8.09532 14.2206 7.7903 14.6129L7.70711 14.7071C7.34662 15.0676 6.77939 15.0953 6.3871 14.7903L6.29289 14.7071L2.29289 10.7071L2.2515 10.6631L2.19633 10.5953L2.12467 10.4841L2.07123 10.3713L2.03585 10.266L2.00683 10.1175L2 10L2.00279 9.92476L2.02024 9.79927L2.04974 9.68786L2.09367 9.57678L2.146 9.47929L2.21279 9.38325C2.23767 9.35153 2.26443 9.32136 2.29289 9.29289L6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289C8.06759 5.65338 8.09532 6.22061 7.7903 6.6129L7.70711 6.70711L5.415 9H17C17.5523 9 18 9.44772 18 10Z"
            fill="black"
          />
        </svg>
      </div>

      {props.pageNums.map((num, idx) => (
        <div
          key={`page-num-${idx}`}
          onClick={() => {
            props.setPage(num);
          }}
        >
          <p className={props.page == num ? "active" : ""}>{num}</p>
        </div>
      ))}

      <div
        className={
          props.pageNums[props.pageNums.length - 1] == props.page ? "hide" : ""
        }
        onClick={() => {
          props.setPage(props.page + 1);
        }}
      >
        <svg
          className="arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 10C2 9.44772 2.44772 9 3 9H14.585L12.2929 6.70711C11.9324 6.34662 11.9047 5.77939 12.2097 5.3871L12.2929 5.29289C12.6534 4.93241 13.2206 4.90468 13.6129 5.2097L13.7071 5.29289L17.7071 9.29289L17.7485 9.33685L17.8037 9.40469L17.8753 9.51594L17.9288 9.62866L17.9642 9.73401L17.9932 9.88253L18 10L17.9972 10.0752L17.9798 10.2007L17.9503 10.3121L17.9063 10.4232L17.854 10.5207L17.7872 10.6168C17.7623 10.6485 17.7356 10.6786 17.7071 10.7071L13.7071 14.7071C13.3166 15.0976 12.6834 15.0976 12.2929 14.7071C11.9324 14.3466 11.9047 13.7794 12.2097 13.3871L12.2929 13.2929L14.585 11H3C2.44772 11 2 10.5523 2 10Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}

export default Pagination;
