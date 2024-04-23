import { createSlice } from "@reduxjs/toolkit";

export const loadingOverlaySlice = createSlice({
  name: "LoadingOverlay",
  initialState: {
    loadingOverlay: false,
  },

  reducers: {
    setLoadingOverlay: (state, action) => {
      state.loadingOverlay = action.payload;
    },
  },
});

export const { setLoadingOverlay } = loadingOverlaySlice.actions;
export default loadingOverlaySlice.reducer;
