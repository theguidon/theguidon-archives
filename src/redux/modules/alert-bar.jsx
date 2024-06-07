import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const showAlertBar = createAsyncThunk("showAlertBar", async () => {
  await new Promise((res) => setTimeout(res, 5000));
});

const alertBarSlice = createSlice({
  name: "alertBar",
  initialState: {
    active: false,
    text: "",
    stack: [],
  },
  extraReducers: (builder) => {
    builder.addCase(showAlertBar.pending, (state, action) => {
      state.active = true;
      state.text = action.meta.arg;

      state.stack.push(action.meta.arg);
    });

    builder.addCase(showAlertBar.fulfilled, (state, action) => {
      state.stack.shift();
      if (state.stack.length == 0) state.active = false;
    });
  },
});

export default alertBarSlice.reducer;
