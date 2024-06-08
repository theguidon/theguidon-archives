import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchMinmaxDates = createAsyncThunk(
  "fetchMinmaxDates",
  async () => {
    const response = await fetch(
      "https://api.theguidon.com/archives/wp-json/api/v1/minmax"
    );
    return response.json();
  }
);

const minmaxDatesSlice = createSlice({
  name: "minmaxDates",
  initialState: {
    isUpdated: false,
    min: {
      year: 1929,
      month: 6,
      day: 22,
    },
    max: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMinmaxDates.fulfilled, (state, action) => {
      state.isUpdated = true;
      let mindate = new Date(action.payload.min);
      let maxdate = new Date(action.payload.max);

      state.min = {
        year: mindate.getFullYear(),
        month: mindate.getMonth() + 1,
        day: mindate.getDate(),
      };

      state.max = {
        year: maxdate.getFullYear(),
        month: maxdate.getMonth() + 1,
        day: maxdate.getDate(),
      };
      // state.min = action.payload.min;
      // state.max = action.payload.max;
    });

    builder.addCase(fetchMinmaxDates.rejected, (state, action) => {
      console.error(action.payload);
    });
  },
});

export default minmaxDatesSlice.reducer;
