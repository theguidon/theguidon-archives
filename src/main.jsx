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
    path: "/testing",
    element: <Root />,
    children: [
      {
        path: "/testing",
        element: <Home />,
      },
      {
        path: "/testing/issues",
        loader: async () => {
          return redirect("/");
        },
      },
      {
        path: "/testing/about",
        element: <About />,
      },
      {
        path: "/testing/:query",
        element: <Browse />,
      },
      {
        path: "/testingissues/freshmanual-2023",
        element: <Issue />,
      },
      {
        path: "/testing/recently-uploaded",
        element: (
          <Browse
            title="What’s New on the Archive"
            subtitle="recently uploaded"
          />
        ),
      },
      {
        path: "/testing/releases",
        element: <Browse title="Releases This Term" subtitle="2023-2024" />,
      },
      {
        path: "/testing/:query",
        element: <Browse />,
      },
      {
        path: "/testing/issues/:query",
        loader: async () => {
          return redirect("/testing/");
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
