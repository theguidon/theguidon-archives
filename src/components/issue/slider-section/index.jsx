import "./index.css";

function SliderSection(props) {
  return (
    <section className="slider-section">
      <div className="general-container">
        <div className="slider">
          <div
            className="slider-fill"
            style={{
              width: `${props.sliderPercentage}%`,
            }}
          />
          <div
            className="slider-circle"
            style={{
              left: `${props.sliderPercentage}%`,
            }}
          />
        </div>

        <div className="text-controls">
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 21"
            fill="none"
            onClick={props.onLeftClick}
          >
            <path
              d="M12.7107 6.6248C13.0182 6.34663 13.0427 5.87114 12.7652 5.56276C12.4878 5.25438 12.0135 5.22989 11.706 5.50806L7.28759 9.50408C6.95661 9.80342 6.95752 10.3244 7.28954 10.6226L11.6693 14.5559C11.9779 14.833 12.452 14.8069 12.7284 14.4975C13.0048 14.1882 12.9787 13.7128 12.6701 13.4357L9.24207 10.357C9.06551 10.1985 9.06503 9.92195 9.24103 9.76277L12.7107 6.6248Z"
              fill="#666666"
            />
          </svg>

          <p className="page">{props.pageText}</p>

          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 21"
            fill="none"
            onClick={props.onRightClick}
          >
            <path
              d="M7.28934 13.4377C6.98177 13.7159 6.95735 14.1914 7.23479 14.4997C7.51223 14.8081 7.98647 14.8326 8.29404 14.5544L12.7124 10.5584C13.0434 10.2591 13.0425 9.73809 12.7105 9.43992L8.33066 5.50656C8.02212 5.22947 7.54796 5.25563 7.2716 5.56498C6.99524 5.87433 7.02132 6.34973 7.32986 6.62682L10.7579 9.70546C10.9345 9.86402 10.935 10.1405 10.759 10.2997L7.28934 13.4377Z"
              fill="#666666"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default SliderSection;
