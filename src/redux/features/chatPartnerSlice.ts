import { createSlice } from "@reduxjs/toolkit";

export const chatPartnerSlice = createSlice({
  name: "ChatPartner",
  initialState: {
    chatPartnerId: "",
  },

  reducers: {
    setChatPartnerId: (state, action) => {
      state.chatPartnerId = action.payload;
    },
  },
});

export const { setChatPartnerId } = chatPartnerSlice.actions;

export default chatPartnerSlice.reducer;
