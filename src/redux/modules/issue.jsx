import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchIssue = createAsyncThunk("fetchIssues", async ({ slug }) => {
  const response = await fetch(
    `https://api.theguidon.com/archives/wp-json/api/v1/issue/${slug}`
  );
  return response.json();
});

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    isLoading: true,
    isError: false,
    isReady: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssue.pending, (state, action) => {
      state.isLoading = true;
      state.isReady = false;
    });
    builder.addCase(fetchIssue.fulfilled, (state, action) => {
      state.isLoading = false;
      if (Array.isArray(action.payload)) state.data[action.meta.arg.slug] = {};
      else state.data[action.payload.fixed_slug] = action.payload;
      state.isReady = true;
    });
    builder.addCase(fetchIssue.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default issueSlice.reducer;
