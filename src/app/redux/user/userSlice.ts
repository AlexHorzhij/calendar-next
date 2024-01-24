import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./userOperations";

const initialState = {
  name: "",
  email: "",
  id: "",
  authorized: false,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.id = "";
      state.authorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.name = payload.body.name;
        state.authorized = true;
        state.email = payload.body.email;
        state.id = payload.body._id;
        state.isLoading = false;
      })
      .addCase(
        registerUser.rejected,
        (state, { payload }: { payload: any }) => {
          state.error = payload.message;
          state.isLoading = false;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.name = payload.body.name;
        state.authorized = true;
        state.email = payload.body.email;
        state.id = payload.body._id;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, { payload }: { payload: any }) => {
        state.error = payload.message;
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;
