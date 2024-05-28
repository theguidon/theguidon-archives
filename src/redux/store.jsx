import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./modules/issues";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
