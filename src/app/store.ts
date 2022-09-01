
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import wishlistReducer from "./Reducers/Watchlist/watchlist"

export const store = configureStore({
  reducer: {
    wishlistSlice: wishlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
