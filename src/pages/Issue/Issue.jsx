import IssueViewer from "./IssueViewer";
import pdf from "../../assets/freshmanual.pdf";
import image from "../../assets/images/freshmanual.png";
// archives.theguidon.com/freshmanual-2023

export default function Issue() {
  return (
    <main>
      <IssueViewer file={pdf} />
      <div className=" w-screen flex flex-row flex-shrink-0 justify-start items-center p-6 lg:p-24 gap-x-6 lg:gap-x-20">
        <div className="relative w-40 lg:w-[18rem] flex-shrink-0  aspect-square bg-[#EFF5FA]">
          <img
            src={image}
            className=" max-w-[80%] max-h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="max-w-[47.75rem]">
          <h1 className="lg:text-[2.5rem] text-lg font-tiemposheadline text-guidon font-bold leading-[1.4]">
            FreshManual 2023
          </h1>
          <p className="text-[#979797] text-xs lg:text-base font-chivo uppercase tracking-[0.04rem]">
            7 August 2023
          </p>
          <p className="font-chivo text-guidon text-xs lg:text-lg mt-2 mb-8">
            Getting ready for college just got way better. Prep for the year
            ahead with Vantage Magazine's Freshmanual 2023! This year's edition
            is full of tips and tricks from upperclassmen—from
            highly-recommended Katipunan restaurants to must-do campus
            activities!
          </p>
        </div>
        {/* <div>
            <p className="font-chivo leading-[1.2rem] tracking-wider text-[#979797] uppercase">
              SHARE
            </p>
          </div> */}
      </div>
    </main>
  );
}
