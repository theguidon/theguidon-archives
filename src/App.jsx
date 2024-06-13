import React, { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

import HomePage from "./pages/home";
import BrowsePage from "./pages/browse";
import IssuePage from "./pages/issue";
import SearchPage from "./pages/search";
import AboutPage from "./pages/about";
import Page404 from "./pages/404";

import { ScrollToTop } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import AlertBar from "./components/alert-bar";
import { hideModals } from "./redux/modules/hide-modals";

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
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isFullscreen = useSelector((state) => state.fullscreen.isFullscreen);
  const modals = useSelector((state) => state.hideModals);

  useEffect(() => {
    if (isFullscreen) {
      if (document.body.requestFullscreen) document.body.requestFullscreen();
      else if (document.body.mozRequestFullScreen)
        document.body.mozRequestFullscreen();
      else if (document.body.webkitRequestFullscreen)
        document.body.webkitRequestFullscreen();
    } else if (document.fullscreenElement != null) document.exitFullscreen();
  }, [isFullscreen]);

  useEffect(() => {
    document.body.onclick = (event) => {
      let found = event.target.closest(
        ".popup, .filter-container, .controls-left"
      );

      // console.log(found);
      if (found == null && !modals.hideModals) {
        dispatch(hideModals());
      }
    };
  }, []);

  // does not work because it doesn't detect F11
  // useEffect(() => {
  //   document.addEventListener("fullscreenchange", () => {
  //     console.log(document.fullscreenElement != null);
  //     dispatch(setFullscreen(document.fullscreenElement != null));
  //   });
  // }, []);

  return (
    <React.Fragment>
      {pathname.includes("/issue") && isFullscreen ? null : <Header />}
      <Outlet />
      {isFullscreen ? null : <Footer />}
      <AlertBar />
    </React.Fragment>
  );
}
export default App;
