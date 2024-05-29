import "./index.css";

import logo from "./../../assets/logos/base-white.svg";
import { Link } from "react-router-dom";

function MobileMenu(props) {
  const nav = [
    {
      link: "/",
      text: "Home",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.00005 22C5.3432 22 4.00005 20.6569 4.00005 19V13H3.00005C2.10915 13 1.66298 11.9229 2.29294 11.2929L11.2929 2.29289C11.6835 1.90237 12.3166 1.90237 12.7072 2.29289L21.7072 11.2929C22.3371 11.9229 21.891 13 21.0001 13H20.0001V19C20.0001 20.6569 18.6569 22 17.0001 22H7.00005ZM12.0001 4.41421L5.35096 11.0633C5.73015 11.2054 6.00005 11.5712 6.00005 12V19C6.00005 19.5523 6.44777 20 7.00005 20L9.00005 19.999L9.00005 16C9.00005 14.8954 9.89548 14 11.0001 14H13.0001C14.1046 14 15.0001 14.8954 15.0001 16L15 19.999L17.0001 20C17.5523 20 18.0001 19.5523 18.0001 19V12C18.0001 11.5712 18.27 11.2054 18.6491 11.0633L12.0001 4.41421ZM13.0001 16H11.0001L11 19.999H13L13.0001 16Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      link: "/releases",
      text: "Releases",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5 4.49758L12 5.53108L14.5 4.49758C16.1049 3.83414 17.8951 3.83414 19.5 4.49758L21.3714 5.27121C21.751 5.42816 22 5.80819 22 6.23079V18.4735C22 19.0443 21.5523 19.507 21 19.507C20.8728 19.507 20.7467 19.4819 20.6286 19.4331L19.5 18.9665C17.8951 18.3031 16.1049 18.3031 14.5 18.9665L12 20L9.5 18.9665C7.89515 18.3031 6.10485 18.3031 4.5 18.9665L3.37139 19.4331C2.85861 19.6451 2.27664 19.3873 2.07152 18.8573C2.02428 18.7352 2 18.605 2 18.4735V6.23079C2 5.80819 2.24895 5.42816 2.62861 5.27121L4.5 4.49758C6.10485 3.83414 7.89515 3.83414 9.5 4.49758ZM5.26408 6.34587L4 6.86844V17.0141C6.02542 16.254 8.25753 16.2887 10.2641 17.1182L11 17.422V7.282L8.73592 6.34587C7.62037 5.88471 6.37963 5.88471 5.26408 6.34587ZM15.2641 6.34587L13 7.281V17.422L13.7359 17.1182C15.7425 16.2887 17.9746 16.254 20 17.0141V6.86844L18.7359 6.34587C17.6204 5.88471 16.3796 5.88471 15.2641 6.34587Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      link: "/releases/recent",
      text: "Recently Uploaded",
    },
    {
      link: "/releases/press",
      text: "Press Issues",
    },
    {
      link: "/releases/gradmag",
      text: "Graduation Magazines",
    },
    {
      link: "/releases/freshmanual",
      text: "Freshmanuals",
    },
    {
      link: "/releases/uaap-primer",
      text: "UAAP Primers",
    },
    {
      link: "/releases/legacy",
      text: "Over the Years",
    },
    {
      link: "/releases/others",
      text: "Others",
    },
    {
      link: "/about",
      text: "About",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 10C12.5523 10 13 10.4477 13 11V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11C11 10.4477 11.4477 10 12 10ZM12 6C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div
        id="bg-tint"
        className={props.isActive ? "active" : ""}
        onClick={props.toggleMobileMenu}
      />
      <div id="mobile-menu" className={props.isActive ? "active" : ""}>
        <div className="head">
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>

          <svg
            className="close"
            onClick={props.toggleMobileMenu}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.2222 16.0003L26.5397 7.6828C27.1541 7.06838 27.1541 6.07524 26.5397 5.46082C25.9253 4.84639 24.9321 4.84639 24.3177 5.46082L16.0002 13.7783L7.68279 5.46082C7.06837 4.84639 6.07524 4.84639 5.46082 5.46082C4.84639 6.07524 4.84639 7.06838 5.46082 7.6828L13.7783 16.0003L5.46082 24.3178C4.84639 24.9323 4.84639 25.9254 5.46082 26.5398C5.76724 26.8463 6.16952 27.0002 6.5718 27.0002C6.97408 27.0002 7.37636 26.8463 7.68279 26.5398L16.0002 18.2223L24.3177 26.5398C24.6241 26.8463 25.0264 27.0002 25.4287 27.0002C25.831 27.0002 26.2333 26.8463 26.5397 26.5398C27.1541 25.9254 27.1541 24.9323 26.5397 24.3178L18.2222 16.0003Z"
              fill="white"
            />
          </svg>
        </div>

        <nav>
          {nav.map((row, idx) => (
            <Link to={row.link} key={`row-${idx}`}>
              {row.icon ? row.icon : <div />}
              <p>{row.text}</p>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
