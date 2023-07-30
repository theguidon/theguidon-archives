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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "issues",
        loader: async () => {
          return redirect("/");
        },
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/:query",
        element: <Browse />,
      },
      {
        path: "/recently-uploaded",
        element: (
          <Browse
            title="What’s New on the Archive"
            subtitle="recently uploaded"
          />
        ),
      },
      {
        path: "/releases",
        element: <Browse title="Releases This Term" subtitle="2023-2024" />,
      },
      {
        path: "/:query",
        element: <Browse />,
      },
      {
        path: "issues/:issueId",
        element: <Issue />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
