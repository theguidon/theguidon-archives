import list from "./../../../assets/icons/list.svg";
import search from "./../../../assets/icons/search-white.svg";
import reader_double from "./../../../assets/icons/reader-double.svg";
import reader_single from "./../../../assets/icons/reader-single.svg";
import zoom_in from "./../../../assets/icons/zoom-in.svg";
import zoom_out from "./../../../assets/icons/zoom-out.svg";

import "./index.css";
import { Link } from "react-router-dom";

function TitleBar(props) {
  return (
    <section className="title-bar">
      <div className="general-container">
        <div className="controls-left">
          <Link to={``} className="back-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.2528 7.91226C15.6219 7.57846 15.6512 7.00787 15.3183 6.63781C14.9853 6.26776 14.4162 6.23837 14.0472 6.57217L8.74512 11.3674C8.34795 11.7266 8.34904 12.3518 8.74746 12.7096L14.0032 17.4296C14.3735 17.7621 14.9425 17.7307 15.2741 17.3595C15.6057 16.9883 15.5744 16.4178 15.2042 16.0853L11.0245 12.3316C10.8479 12.1731 10.8474 11.8966 11.0234 11.7374L15.2528 7.91226Z"
                fill="white"
              />
            </svg>
            Back
          </Link>

          <div className="controls-group">
            <img className="list icon" src={list} />
            <img className="search icon" src={search} />
          </div>
        </div>

        <h6 className="title">{props.title}</h6>

        <div className="controls-right">
          <div className="reader-group">
            <img
              className={`reader icon ${props.isDoubleReader ? "active" : ""}`}
              src={reader_double}
              onClick={() => props.setIsDoubleReader(true)}
            />
            <img
              className={`reader icon ${props.isDoubleReader ? "" : "active"}`}
              src={reader_single}
              onClick={() => props.setIsDoubleReader(false)}
            />
          </div>

          <div className="zoom-group">
            <img className="zoom icon" src={zoom_in} onClick={props.onZoomIn} />

            <div className="zoom-container">
              <div
                className="zoom-fill"
                style={{
                  width: `${props.zoom}%`,
                }}
              />
              <div
                className="zoom-circle"
                style={{
                  left: `${props.zoom}%`,
                }}
              />
            </div>

            <img
              className="zoom icon"
              src={zoom_out}
              onClick={props.onZoomOut}
            />
          </div>

          <div
            className="fullscreen icon"
            onClick={() => {
              props.setIsFullscreen(!props.isFullscreen);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              {props.isFullscreen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.6001 1.59961C6.01037 1.59961 6.3485 1.90844 6.39472 2.30631L6.4001 2.39961V5.59961C6.4001 6.00988 6.09127 6.34802 5.69339 6.39423L5.6001 6.39961H2.4001C1.95827 6.39961 1.6001 6.04144 1.6001 5.59961C1.6001 5.18934 1.90893 4.8512 2.3068 4.80499L2.4001 4.79961H4.8001V2.39961C4.8001 1.98934 5.10893 1.6512 5.5068 1.60499L5.6001 1.59961ZM5.69339 9.60499L5.6001 9.59961H2.4001L2.3068 9.60499C1.90893 9.6512 1.6001 9.98934 1.6001 10.3996C1.6001 10.8099 1.90893 11.148 2.3068 11.1942L2.4001 11.1996H4.8001V13.5996L4.80548 13.6929C4.84814 14.0602 5.13954 14.3516 5.5068 14.3942L5.6001 14.3996L5.69339 14.3942C6.06066 14.3516 6.35206 14.0602 6.39472 13.6929L6.4001 13.5996V10.3996L6.39472 10.3063C6.35206 9.93905 6.06066 9.64765 5.69339 9.60499ZM14.4001 10.3996C14.4001 9.95778 14.0419 9.59961 13.6001 9.59961H10.4001L10.3068 9.60499C9.90893 9.6512 9.6001 9.98934 9.6001 10.3996V13.5996L9.60548 13.6929C9.65169 14.0908 9.98983 14.3996 10.4001 14.3996L10.4934 14.3942C10.8913 14.348 11.2001 14.0099 11.2001 13.5996V11.1996H13.6001L13.6934 11.1942C14.0913 11.148 14.4001 10.8099 14.4001 10.3996ZM10.4934 1.60499L10.4001 1.59961L10.3068 1.60499C9.93954 1.64765 9.64814 1.93905 9.60548 2.30631L9.6001 2.39961V5.59961L9.60548 5.69291C9.64814 6.06017 9.93954 6.35157 10.3068 6.39423L10.4001 6.39961H13.6001L13.6934 6.39423C14.0913 6.34802 14.4001 6.00988 14.4001 5.59961C14.4001 5.18934 14.0913 4.8512 13.6934 4.80499L13.6001 4.79961H11.2001V2.39961L11.1947 2.30631C11.1521 1.93905 10.8607 1.64765 10.4934 1.60499Z"
                  fill="#6A757C"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.60132 1.60156C6.04315 1.60156 6.40132 1.95973 6.40132 2.40156C6.40132 2.81183 6.09249 3.14997 5.69461 3.19618L5.60132 3.20156H3.20132V5.60156C3.20132 6.01183 2.89249 6.34997 2.49462 6.39618L2.40132 6.40156C1.99105 6.40156 1.65291 6.09273 1.6067 5.69486L1.60132 5.60156V2.40156C1.60132 1.99129 1.91015 1.65316 2.30802 1.60694L2.40132 1.60156H5.60132ZM2.49462 9.60694L2.40132 9.60156L2.30802 9.60694C1.94076 9.6496 1.64936 9.941 1.6067 10.3083L1.60132 10.4016V13.6016L1.6067 13.6949C1.64936 14.0621 1.94076 14.3535 2.30802 14.3962L2.40132 14.4016H5.60132L5.69461 14.3962C6.09249 14.35 6.40132 14.0118 6.40132 13.6016C6.40132 13.1913 6.09249 12.8532 5.69461 12.8069L5.60132 12.8016H3.20132V10.4016L3.19594 10.3083C3.15328 9.941 2.86188 9.6496 2.49462 9.60694ZM14.3959 10.3083C14.3497 9.91039 14.0116 9.60156 13.6013 9.60156L13.508 9.60694C13.1102 9.65316 12.8013 9.99129 12.8013 10.4016V12.8016H10.4013L10.308 12.8069C9.91015 12.8532 9.60132 13.1913 9.60132 13.6016C9.60132 14.0434 9.95949 14.4016 10.4013 14.4016H13.6013L13.6946 14.3962C14.0925 14.35 14.4013 14.0118 14.4013 13.6016V10.4016L14.3959 10.3083ZM13.6946 1.60694L13.6013 1.60156H10.4013L10.308 1.60694C9.91015 1.65316 9.60132 1.99129 9.60132 2.40156C9.60132 2.81183 9.91015 3.14997 10.308 3.19618L10.4013 3.20156H12.8013V5.60156L12.8067 5.69486C12.8494 6.06212 13.1408 6.35352 13.508 6.39618L13.6013 6.40156L13.6946 6.39618C14.0619 6.35352 14.3533 6.06212 14.3959 5.69486L14.4013 5.60156V2.40156L14.3959 2.30827C14.3533 1.941 14.0619 1.6496 13.6946 1.60694Z"
                  fill="white"
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TitleBar;
