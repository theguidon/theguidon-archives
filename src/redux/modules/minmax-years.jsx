import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchMinmaxYears = createAsyncThunk(
  "fetchMinmaxYears",
  async () => {
    const response = await fetch(
      "https://api.theguidon.com/archives/wp-json/api/v1/minmax"
    );
    return response.json();
  }
);

const minmaxYearsSlice = createSlice({
  name: "minmaxYears",
  initialState: {
    isUpdated: false,
    min: 1929,
    max: new Date().getFullYear(),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMinmaxYears.fulfilled, (state, action) => {
      state.isUpdated = true;
      state.min = action.payload.min;
      state.max = action.payload.max;
    });

    builder.addCase(fetchMinmaxYears.rejected, (state, action) => {
      console.error(action.payload);
    });
  },
});

export default minmaxYearsSlice.reducer;
