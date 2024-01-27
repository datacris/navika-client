import { createSlice } from "@reduxjs/toolkit";

export type Menu = {
  title: string;
  link: string;
  isAuthRequired: boolean;
  paths: Array<any>;
};
type MenuState = {
  menu: Menu[];
};

const initialState: MenuState = {
  menu: [
    {
      title: "Home",
      link: "/home",
      isAuthRequired: false,
      paths: ["/", "/home"],
    },
    {
      title: "Experiments",
      link: "/experiments",
      isAuthRequired: true,
      paths: ["/experiments"],
    },
    {
      title: "Todo - redux",
      link: "/todo-redux",
      isAuthRequired: true,
      paths: ["/todo-redux"],
    },
  ],
};

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});
export default menu.reducer;
