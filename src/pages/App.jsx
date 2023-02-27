import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Releases from "./Releases";
import FourOhFour from "./FourOhFour";
import Header from "../components/Header";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="releases" element={<Releases />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
