import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

import HomePage from "./pages/home";
import BrowsePage from "./pages/browse";
import IssuePage from "./pages/issue";
import SearchPage from "./pages/search";
import AboutPage from "./pages/about";
import Page404 from "./pages/404";

import ScrollToTop from "./utils/scroll-to-top";
import { useSelector } from "react-redux";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={GeneralLayout()}>
          <Route path="/" element={<HomePage />} />
          <Route path="/releases/:slug?" element={<BrowsePage />} />
          <Route path="/issue/:slug" element={<IssuePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>

      <ScrollToTop />
    </React.Fragment>
  );
}

function GeneralLayout() {
  const isFullscreen = useSelector((state) => state.fullscreen.isFullscreen);

  return (
    <React.Fragment>
      {isFullscreen ? null : <Header />}
      <Outlet />
      {isFullscreen ? null : <Footer />}
    </React.Fragment>
  );
}
export default App;
