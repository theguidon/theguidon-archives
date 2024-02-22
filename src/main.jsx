import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom";
import "./index.css";
import Root from "./pages/Root";
import Home from "./pages/Home/Home";
import Issue from "./pages/Issue/Issue";
import Browse from "./pages/Browse/Browse";
import About from "./pages/About/About";
import Wip from "./pages/wip/Wip";

const router = createBrowserRouter([
  // todo fix path to
  {
    path: "/",
    element: <Root />,
    errorElement: <Wip />,
    children: [
      {
        path: "",
        loader: async () => {
          return redirect("/under-construction");
        },
      },
      {
        path: "issues/freshmanual-2023",
        element: (
          <Issue
            pdfPath="/freshmanual-2023.pdf"
            pages={12}
            title="FreshManual 2023"
            date="7 August 2023"
            imagePath="/freshmanual-2023.png"
            desc="Getting ready for college just got way better. Prep for the year
              ahead with Vantage Magazine's Freshmanual 2023! This year's
              edition is full of tips and tricks from upperclassmen—from
              highly-recommended Katipunan restaurants to must-do campus
              activities!"
          />
        ),
      },
      {
        path: "issues/augsept-2023",
        element: (
          <Issue
            pdfPath="/augsept-2023.pdf"
            pages={24}
            title="August-September 2023"
            date="20 September 2023"
            imagePath="/augsept-2023.png"
            desc={
              <>
                51 years since the declaration of Martial Law, the nation still
                grapples with a divided memory of the Marcos dictatorship. As we
                continue to navigate landscapes that threaten journalistic
                integrity, The GUIDON stands firm in its commitment to preserve
                and forward the Filipino narrative that depicts the people's
                enduring struggle for democracy, truth, and justice.
                <br />
                <br />
                With the mission to shed light on the unvarnished truth, The
                GUIDON presents its August-September Martial Law Special here:
              </>
            }
          />
        ),
      },
      {
        path: "issues/uaap-86-first-semester-primer",
        element: (
          <Issue
            pdfPath="/uaap-86-first-semester-primer.pdf"
            pages={60}
            title="UAAP 86 First Primer Semester"
            date="27 September 2023"
            imagePath="/uaap-86-first-semester-primer.png"
            desc=""
          />
        ),
	  },
		{
			path: "issues/novdec-2023",
			element: (
				<Issue
				pdfPath="/novdec-2023.pdf" // TODO: upload the pdf
				pages={27} // TODO: change the page number
				title="November-December 2023"
				date="28 November 2023" // TODO: add the date
				imagePath="/novdec-2023.png" // TODO: upload compressed first page
				desc="" // TODO: add the description
				/>
			),
		},
      {
        path: "issues/uaap-86-second-semester-primer",
        element: (
          <Issue
            pdfPath="/uaap-86-second-semester-primer.pdf"
            pages={60}
            title="UAAP 86 Second Primer Semester"
            date="22 February 2024"
            imagePath="/uaap-86-second-semester-primer.png"
            desc=""
          />
        ),
	  },
      //   {
      //     path: "",
      //     element: <Home />,
      //   },
      //   {
      //     path: "/issues",
      //     loader: async () => {
      //       return redirect("/");
      //     },
      //   },
      //   {
      //     path: "/about",
      //     element: <About />,
      //   },
      //   {
      //     path: "/browse/:type",
      //     element: <Browse />,
      //   },
      //   {
      //     path: "browse/recently-uploaded",
      //     element: (
      //       <Browse
      //         title="What’s New on the Archive"
      //         subtitle="recently uploaded"
      //       />
      //     ),
      //   },
      //   {
      //     path: "browse/releases",
      //     element: <Browse title="Releases This Term" subtitle="2023-2024" />,
      //   },
      //   {
      //     path: "/issues/:query",
      //     loader: async () => {
      //       return redirect("/");
      //     },
      //   },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
