import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    user: {},
    selected_category: "",
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
    setSelectedCategory: (state, action) => {
      console.log(action.payload);

      state.selected_category = action.payload;
    },
  },
});

export const { setUser, setLogout, setSelectedCategory } = user.actions;
let reducers = user.reducer;
export default reducers;
