import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authAction";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: "",
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.userToken = action.payload.token;
      state.success = true;
    },
    resetUser(state) {
      state.loading = false;
      state.userInfo = null;
      state.userToken = "";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
