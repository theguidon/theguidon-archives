import IssueViewer from "./IssueViewer";
import pdf from "../../assets/freshmanual.pdf";
import image from "../../assets/images/freshmanual.png";
import facebook from "../../assets/icons/facebook.svg";
import { useLocation } from "react-router-dom";
// archives.theguidon.com/freshmanual-2023

export default function Issue() {
  const { pathname } = useLocation();
  return (
    <main>
      <IssueViewer file={pdf} />
      <div className=" w-screen flex flex-row flex-shrink-0 justify-center items-center p-6 sm:p-16 lg:p-24 gap-x-6 lg:gap-x-20">
        <div className="relative w-40 lg:w-[18rem] sm:w-[13rem] flex-shrink-0  aspect-square bg-[#EFF5FA]">
          <img
            src={image}
            className=" max-w-[80%] max-h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="max-w-[50%]">
          <div>
            <h1 className="lg:text-[2.5rem] text-lg sm:text-3xl font-tiemposheadline text-guidon font-bold leading-[1.4]">
              FreshManual 2023
            </h1>
            <p className="text-[#979797] text-xs lg:text-base font-chivo uppercase tracking-[0.04rem]">
              7 August 2023
            </p>
            <p className="font-chivo text-guidon text-xs sm:text-base lg:text-xl mt-2 mb-8">
              Getting ready for college just got way better. Prep for the year
              ahead with Vantage Magazine's Freshmanual 2023! This year's
              edition is full of tips and tricks from upperclassmen—from
              highly-recommended Katipunan restaurants to must-do campus
              activities!
            </p>
          </div>
          <div>
            <p className="font-chivo leading-[1.2rem] tracking-wider text-[#979797] uppercase">
              SHARE
            </p>
            <div className="text-white flex flex-row items-center gap-x-4 mt-2">
              <a
                href={`http://www.facebook.com/sharer.php?u=https://archives.theguidon.issues${pathname}`}
                target="_blank"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="ic:baseline-facebook">
                    <path
                      id="Vector"
                      d="M22.5 12.5C22.5 6.98 18.02 2.5 12.5 2.5C6.98 2.5 2.5 6.98 2.5 12.5C2.5 17.34 5.94 21.37 10.5 22.3V15.5H8.5V12.5H10.5V10C10.5 8.07 12.07 6.5 14 6.5H16.5V9.5H14.5C13.95 9.5 13.5 9.95 13.5 10.5V12.5H16.5V15.5H13.5V22.45C18.55 21.95 22.5 17.69 22.5 12.5Z"
                      fill="#1C4480"
                    />
                  </g>
                </svg>
              </a>
              <a
                href={`http://www.twitter.com/share?url=https://archives.theguidon.issues${pathname}`}
                target="_blank"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.69804 0.584077C1.85054 0.584077 1.0032 0.583911 0.155698 0.58491C0.112583 0.58491 0.053985 0.567097 0.0298468 0.608049C-0.000284414 0.659322 0.056815 0.696279 0.0834503 0.732902C0.227614 0.93017 0.37544 1.12494 0.521934 1.32071C2.64743 4.16203 4.77243 7.00353 6.89992 9.84319C6.95669 9.91893 6.95003 9.96471 6.8896 10.03C5.78224 11.2254 4.6777 12.4233 3.57018 13.6186C2.66491 14.5958 1.75598 15.5696 0.849881 16.546C0.581031 16.8356 0.31551 17.1283 0.0494903 17.4206C0.0261844 17.4462 -0.0134356 17.473 0.00454323 17.5132C0.022855 17.5544 0.0693003 17.539 0.10376 17.5391C0.527427 17.5401 0.951261 17.5386 1.37493 17.5403C1.46283 17.5406 1.52908 17.5103 1.58918 17.4456C2.25456 16.7296 2.9236 16.0168 3.58832 15.2999C4.28883 14.5443 4.98434 13.7839 5.68452 13.0278C6.31278 12.3492 6.9457 11.6752 7.57196 10.995C7.65037 10.9099 7.69182 10.9113 7.75791 11.0002C8.0737 11.4253 8.39383 11.8472 8.71095 12.2712C9.97463 13.9612 11.2391 15.6505 12.4982 17.344C12.6064 17.4895 12.7206 17.5473 12.904 17.5463C14.4807 17.5383 16.0575 17.5408 17.6341 17.5401C17.7237 17.5401 17.8134 17.541 17.903 17.5395C17.9343 17.539 17.9745 17.5521 17.9932 17.519C18.0157 17.4792 17.977 17.4517 17.9572 17.4233C17.9106 17.3563 17.8618 17.2913 17.8131 17.226C15.4537 14.0714 13.0948 10.9166 10.7329 7.7638C10.6708 7.6809 10.6845 7.63512 10.7481 7.56803C11.1547 7.1397 11.5416 6.69339 11.947 6.26356C12.7349 5.42788 13.5083 4.57854 14.2889 3.73587C15.2244 2.72589 16.1613 1.71708 17.0974 0.707599C17.1215 0.681629 17.1615 0.657325 17.1447 0.616206C17.1277 0.574422 17.0813 0.586075 17.0466 0.586075C16.6148 0.585076 16.183 0.58724 15.7512 0.583911C15.6623 0.583245 15.5982 0.611545 15.5381 0.676968C15.1136 1.13892 14.6861 1.59805 14.2601 2.05851C12.8489 3.58322 11.4376 5.10792 10.0284 6.63446C9.96631 6.70171 9.93668 6.70122 9.88257 6.6288C8.40615 4.65029 6.92755 2.67345 5.45213 0.694115C5.39103 0.612211 5.32677 0.582413 5.22806 0.582746C4.38472 0.585576 3.54138 0.58441 2.69804 0.584244V0.584077ZM3.53472 1.72207C3.88514 1.72207 4.23556 1.7239 4.58581 1.72107C4.71 1.72007 4.79656 1.76452 4.87347 1.8674C7.61325 5.53642 10.3557 9.20344 13.0976 12.8708C13.9246 13.9768 14.752 15.0827 15.5774 16.1899C15.6211 16.2487 15.7152 16.3081 15.6761 16.3822C15.6431 16.4446 15.5482 16.3897 15.4811 16.3897C14.7968 16.389 14.1124 16.3825 13.4281 16.3865C13.2859 16.3873 13.2012 16.3367 13.1168 16.2232C11.8503 14.52 10.5791 12.8203 9.30808 11.1205C7.18092 8.27536 5.0531 5.43071 2.92544 2.58589C2.74731 2.34767 2.56786 2.11062 2.3899 1.8724C2.3641 1.83794 2.31732 1.80614 2.33896 1.75637C2.36177 1.70409 2.41703 1.72274 2.45898 1.72257C2.81756 1.72124 3.17614 1.72174 3.53455 1.72207H3.53472Z"
                    fill="#1C4480"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
