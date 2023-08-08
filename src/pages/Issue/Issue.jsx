import IssueViewer from "./IssueViewer";
import pdf from "../../assets/freshmanual.pdf";
import image from "../../assets/images/freshmanual.png";
// archives.theguidon.com/freshmanual-2023

export default function Issue() {
  return (
    <main>
      <IssueViewer file={pdf} />
      <div className="h-[29rem] w-screen flex flex-row flex-shrink-0 justify-start items-center px-[6.5rem] gap-x-10">
        <div className="relative w-[18rem] flex-shrink-0  aspect-square bg-[#EFF5FA]">
          <img
            src={image}
            className="w-[10rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div>
          <h1 className="text-[2.5rem] font-tiemposheadline text-guidon font-bold leading-[1.4]">
            FreshManual 2023
          </h1>
          <p className="text-[#979797] font-chivo uppercase tracking-[0.04rem]">
            7 August 2023
          </p>
          <p className="font-chivo text-guidon">
            Getting ready for college just got way better. Prep for the year
            ahead with Vantage Magazine's Freshmanual 2023! This year's edition
            is full of tips and tricks from upperclassmen—from
            highly-recommended Katipunan restaurants to must-do campus
            activities!
          </p>
        </div>
        {/* TODO: sharing to socmed */}
      </div>
    </main>
  );
}
