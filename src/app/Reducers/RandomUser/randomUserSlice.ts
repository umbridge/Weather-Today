import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, AppThunk } from "../../store";

export interface UserState {
  user: {
    name: string;
    email: string;
    company: {
      name: string;
    };
  } | null;
}

const initialState: UserState = {
  user: null,
};

export const randomUserSlice = createSlice({
  name: "randomUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = randomUserSlice.actions;

// export const getUser = (state: RootState) => state.randomUser.user;

export const fetchRandomUser = (): AppThunk => (dispatch) => {
  const randomUserId = Math.round(Math.random() * 10);
  axios
    .get(`https://jsonplaceholder.typicode.com/users/${randomUserId}`)
    .then((response) => dispatch(setUser(response.data)));
};

export default randomUserSlice.reducer;
