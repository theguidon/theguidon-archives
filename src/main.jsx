import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./pages/Root";
import Home from "./pages/Home/Home";
import Issue from "./pages/Issue/Issue";
import Browse from "./pages/Browse/Browse";

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
        element: <Home />,
      },
      {
        path: "/:query",
        element: <Browse />,
      },
      {
        path: "/:query/:page",
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
