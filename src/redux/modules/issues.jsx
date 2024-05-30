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
    // isLoading: true,
    // isReady: false,
    isError: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state, action) => {
      // state.isLoading = true;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      // state.isLoading = false;
      // state.isReady = true;

      let slug = action.payload.categ === null ? "all" : action.payload.categ;

      if (state.data[slug] == null) state.data[slug] = {};
      state.data[slug].found = action.payload.found;
      state.data[slug].max_pages = action.payload.max_pages;
      state.data[slug][action.payload.page] = action.payload.issues;
    });

    builder.addCase(fetchIssues.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default issuesSlice.reducer;
