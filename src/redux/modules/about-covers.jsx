import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchAboutCovers = createAsyncThunk(
  "fetchAboutCovers",
  async () => {
    const response = await fetch(
      "https://api.theguidon.com/archives/wp-json/api/v1/random-covers"
    );
    return response.json();
  }
);

const aboutCoversSlice = createSlice({
  name: "aboutCovers",
  initialState: {
    isLoading: true,
    isError: false,
    isReady: false,
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAboutCovers.pending, (state, action) => {
      state.isLoading = true;
      state.isReady = false;
    });

    builder.addCase(fetchAboutCovers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isReady = true;
    });

    builder.addCase(fetchAboutCovers.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default aboutCoversSlice.reducer;
