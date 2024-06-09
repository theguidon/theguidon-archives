import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchIssues = createAsyncThunk(
  "fetchIssues",
  async ({
    categ,
    page,
    order,
    search,
    year,
    from,
    until,
    isLegacy,
    volume,
  }) => {
    let params = new URLSearchParams();

    if ((categ != null && categ == "legacy") || (isLegacy != null && isLegacy))
      params.append("legacy", "true");
    else if (categ != null) params.append("categ", categ);

    if (page != null) params.append("page", page);
    if (order != null) params.append("order", order);

    if (volume != null) params.append("volume", volume);
    if (search != null && search.length > 1) params.append("search", search);

    if (year != null) params.append("year", year);
    if (from != null)
      params.append("from", `${from.year}-${from.month}-${from.day}`);
    if (until != null)
      params.append("until", `${until.year}-${until.month}-${from.day}`);

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
      let slug = null;

      if (
        action.payload.year != null ||
        action.payload.from != null ||
        action.payload.until != null
      )
        slug = "filtered";
      else if (action.payload.search != null) slug = "search";
      else if (action.payload.categ === null) slug = "all";
      else slug = action.payload.categ;

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
