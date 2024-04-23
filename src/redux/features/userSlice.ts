import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MovieOverviewType } from "../../types/MovieType";
import { CredentialType } from "../../types/CredentialType";

type UserSliceState = {
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
      if (action.payload === null) {
        localStorage.removeItem("token");
      } else {
        if (action.payload.token)
          localStorage.setItem("token", action.payload.token);
      }

      state.user = action.payload;
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
