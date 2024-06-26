import { createSlice } from "@reduxjs/toolkit";

const fullscreenSlice = createSlice({
  name: "fullscreen",
  initialState: {
    isFullscreen: false,
  },
  reducers: {
    setFullscreen: (state, action) => {
      state.isFullscreen = action.payload;
    },
  },
});

export const { setFullscreen } = fullscreenSlice.actions;

export default fullscreenSlice.reducer;
