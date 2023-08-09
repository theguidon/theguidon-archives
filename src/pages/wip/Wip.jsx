import logo from "../../assets/images/logo-archive-black.svg";

export default function Wip() {
  return (
    <div className="fixed inset-0 z-50 text-[2rem] font-tiemposheadline flex flex-col justify-center items-center sm:text-[4rem]">
      <img
        src={logo}
        alt=""
        className="w-[10rem] absolute top-[calc(50%-3rem)] -translate-y-1/2 sm:w-[15rem] sm:top-[calc(50%-5rem)]"
      />
      Under Construction
    </div>
  );
}
