import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchIssues = createAsyncThunk(
  "fetchIssues",
  async ({ categ, page, order, search }) => {
    let params = new URLSearchParams();
    if (categ != null) params.append("categ", categ);
    if (page != null) params.append("page", page);
    if (order != null) params.append("order", order);
    if (search != null) params.append("search", search);

    const response = await fetch(
      `https://api.theguidon.com/archives/wp-json/api/v1/issues?${params.toString()}`
    );
    return response.json();
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    isError: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state, { meta }) => {
      if (meta.arg.query != null) state.data.search = {};
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      let slug =
        action.payload.search != null
          ? "search"
          : action.payload.categ === null
          ? "all"
          : action.payload.categ;

      if (state.data[slug] == null) state.data[slug] = {};
      state.data[slug].found = action.payload.found;
      state.data[slug].max_pages = action.payload.max_pages;
      state.data[slug][
        `${action.payload.order == "asc" ? "asc-" : ""}${action.payload.page}`
      ] = action.payload.issues;
    });

    builder.addCase(fetchIssues.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default issuesSlice.reducer;
