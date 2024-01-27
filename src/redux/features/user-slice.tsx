import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  email: string;
  isUserLogued: boolean;
};

const initialState: User = {
  id: 0,
  name: "Guest",
  email: "",
  isUserLogued: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => (state = action.payload),
    removeUser: (state) => (state = initialState),
  },
});

export const { setUser, removeUser } = user.actions;
export default user.reducer;
