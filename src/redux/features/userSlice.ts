import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MovieOverviewType } from "../../types/MovieType";
import { CredentialType } from "../../types/CredentialType";

export type UserSliceState = {
  user: CredentialType | null;
  listFavourites: MovieOverviewType[];
};

const initialState: UserSliceState = {
  user: null,
  listFavourites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      if (action.payload === null) {
        localStorage.removeItem("token");
        localStorage.removeItem("persist:root");
      } else {
        if (action.payload.data.token)
          localStorage.setItem("token", action.payload.data.token);
        state.user = action.payload.data;
      }
    },

    setListFavourites: (state, action) => {
      state.listFavourites = action.payload;
    },

    removeFavourite: (state, action) => {
      const { movieId } = action.payload;
      state.listFavourites = [...state.listFavourites].filter(
        (item) => item.id.toString() !== movieId.toString()
      );
    },

    addFavourite: (state, action: PayloadAction<MovieOverviewType>) => {
      state.listFavourites = [action.payload, ...state.listFavourites];
    },
  },
});

export const { setUser, setListFavourites, addFavourite, removeFavourite } =
  userSlice.actions;
export default userSlice.reducer;
