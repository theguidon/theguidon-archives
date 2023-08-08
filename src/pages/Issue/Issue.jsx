import IssueViewer from "./IssueViewer";
import pdf from "../../assets/freshmanual.pdf";
import image from "../../assets/images/freshmanual.png";
// archives.theguidon.com/freshmanual-2023

export default function Issue() {
  return (
    <main>
      <IssueViewer file={pdf} />
      <div className="h-[29rem] w-[77rem] flex flex-row justify-center items-center gap-x-10">
        <div className="relative w-[18rem] aspect-square bg-[#EFF5FA]">
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
          <p className="font-chivo text-guidon"></p>
        </div>
        {/* TODO: sharing to socmed */}
      </div>
    </main>
  );
}
