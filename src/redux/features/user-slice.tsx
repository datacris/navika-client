import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  email: string;
  isUserLogued: boolean;
  showShownUserProfileForm?: boolean;
};

const initialState: User = {
  id: 0,
  name: "Guest",
  email: "",
  isUserLogued: false,
  showShownUserProfileForm: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => (state = action.payload),
    removeUser: (state) => (state = initialState),
    toogleUserProfileForm: (state) => ({
      ...state,
      showShownUserProfileForm: !state.showShownUserProfileForm,
    }),
  },
});

export const { setUser, removeUser, toogleUserProfileForm } = user.actions;
export default user.reducer;
