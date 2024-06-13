import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// TODO bandaid solution
// Action
export const hideModals = createAsyncThunk("hideModals", async () => {
  await new Promise((res) => setTimeout(res, 100));
});

const hideModalsSlice = createSlice({
  name: "hideModals",
  initialState: {
    stack: [],
    hideModals: false,
  },
  extraReducers: (builder) => {
    builder.addCase(hideModals.pending, (state, action) => {
      state.stack.push(true);
      state.hideModals = true;
    });

    builder.addCase(hideModals.fulfilled, (state, action) => {
      state.stack.shift();
      if (state.stack.length == 0) {
        state.hideModals = false;
      }
    });
  },
});

export default hideModalsSlice.reducer;
