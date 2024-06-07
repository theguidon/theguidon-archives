import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./modules/issues";
import issueReducer from "./modules/issue";
import fullscreenReducer from "./modules/fullscreen";
import aboutCoversReducer from "./modules/about-covers";
import minmaxYearsReducer from "./modules/minmax-years";
import alertBarReducer from "./modules/alert-bar";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    issue: issueReducer,
    fullscreen: fullscreenReducer,
    aboutCovers: aboutCoversReducer,
    minmaxYears: minmaxYearsReducer,
    alertBar: alertBarReducer,
  },
});
