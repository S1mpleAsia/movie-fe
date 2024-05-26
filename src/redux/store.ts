import { Reducer, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice, { UserSliceState } from "./features/userSlice";
import themeModeSlice from "./features/themeModeSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import appStateSlice from "./features/appStateSlice";
import loadingOverlaySlice from "./features/loadingOverlaySlice";
import { PersistPartial } from "redux-persist/es/persistReducer";
import chatPartnerSlice from "./features/chatPartnerSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer: Reducer<UserSliceState & PersistPartial> =
  persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    loadingOverlay: loadingOverlaySlice,
    chatPartnerId: chatPartnerSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
