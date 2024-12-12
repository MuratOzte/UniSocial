import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: {
    shareMessage: "",
  },

  reducers: {
    shareMessageChangeHandler(state, action) {
      state.shareMessage = action.payload;
    },
  },
});

export default feedSlice
