import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchIssues = createAsyncThunk("fetchIssues", async () => {
  const response = await fetch(
    "https://api.theguidon.com/archives/wp-json/api/v1/issues"
  );
  return response.json();
});

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    isLoading: true,
    isError: false,
    isReady: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isReady = true;
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default issuesSlice.reducer;
