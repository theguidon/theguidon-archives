import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./modules/issues";
import issueReducer from "./modules/issue";
import fullscreenReducer from "./modules/fullscreen";
import aboutCoversReducer from "./modules/about-covers";
import minmaxDatesReducer from "./modules/minmax-dates";
import alertBarReducer from "./modules/alert-bar";
import randomReducer from "./modules/random";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    issue: issueReducer,
    fullscreen: fullscreenReducer,
    aboutCovers: aboutCoversReducer,
    minmaxDates: minmaxDatesReducer,
    alertBar: alertBarReducer,
    random: randomReducer,
  },
});
