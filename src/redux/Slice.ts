import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: "",
    isAuthenticated: false,
    authChecked: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    setAuthenticated: (state, action) => {
      state.user.isAuthenticated = action.payload;
    },
    setAuthChecked: (state, action) => {
      state.user.authChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user.name = action.payload;
    },
  },
});

export const { setIsFetching, setAuthenticated, setAuthChecked, setUser } =
  userSlice.actions;

export default userSlice.reducer;
