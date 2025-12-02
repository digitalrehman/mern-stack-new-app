import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const { setUser, setLogout } = user.actions;
let reducers = user.reducer;
export default reducers 
