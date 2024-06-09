import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action
export const fetchRandom = createAsyncThunk("fetchRandom", async () => {
  const response = await fetch(
    "https://api.theguidon.com/archives/wp-json/api/v1/random"
  );
  return response.json();
});

const randomSlice = createSlice({
  name: "random",
  initialState: {
    isLoading: true,
    isError: false,
    isReady: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRandom.pending, (state, action) => {
      state.isLoading = true;
      state.isReady = false;
    });

    builder.addCase(fetchRandom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isReady = true;
    });

    builder.addCase(fetchRandom.rejected, (state, action) => {
      console.error(action.payload);
      state.isError = true;
    });
  },
});

export default randomSlice.reducer;
