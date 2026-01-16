import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: "",
    isAuthenticated: false,
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
    setUser: (state, action) => {
      state.user.name = action.payload;
    },
  },
});

export const { setIsFetching, setAuthenticated, setUser } = userSlice.actions;

export default userSlice.reducer;
