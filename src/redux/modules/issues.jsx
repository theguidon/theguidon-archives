import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchIssues = createAsyncThunk(
  "fetchIssues",
  async ({ categ, page }) => {
    let params = new URLSearchParams();
    if (categ != null) params.append("categ", categ);
    if (page != null) params.append("page", page);

    const response = await fetch(
      `https://api.theguidon.com/archives/wp-json/api/v1/issues?${params.toString()}`
    );
    return response.json();
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    isLoading: true,
    isError: false,
    isReady: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isReady = true;

      if (action.payload.categ === null)
        state.data["all"] = {
          [action.payload.page]: action.payload,
        };
      else
        state.data[action.payload.categ] = {
          [action.payload.page]: action.payload,
        };
    });

    builder.addCase(fetchIssues.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default issuesSlice.reducer;
