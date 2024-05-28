import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchIssues } from "./redux/modules/issues";
import Header from "./components/header";
import Footer from "./components/footer";

import HomePage from "./pages/home";
import BrowsePage from "./pages/browse";
import IssuePage from "./pages/issue";
import SearchPage from "./pages/search";
import AboutPage from "./pages/about";
import Page404 from "./pages/404";

import ScrollToTop from "./utils/scroll-to-top";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIssues());
  }, []);

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
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
export default App;
