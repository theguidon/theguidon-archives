import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./modules/issues";
import issueReducer from "./modules/issue";
import fullscreenReducer from "./modules/fullscreen";
import aboutCoversReducer from "./modules/about-covers";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    issue: issueReducer,
    fullscreen: fullscreenReducer,
    aboutCovers: aboutCoversReducer,
  },
});
