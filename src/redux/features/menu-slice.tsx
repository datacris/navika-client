import { createSlice } from "@reduxjs/toolkit";

export type Menu = {
  title: string;
  link: string;
  isAuthRequired: boolean;
  paths: Array<any>;
  icon?: string;
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
      icon: "DashboardIcon",
    },
    {
      title: "Experiments",
      link: "/experiments",
      isAuthRequired: true,
      paths: ["/experiments"],
      icon: "ScienceOutlinedIcon",
    },
    {
      title: "Todo - redux",
      link: "/todo-redux",
      isAuthRequired: true,
      paths: ["/todo-redux"],
      icon: "ChecklistRtlOutlinedIcon",
    },
    {
      title: "Quotes",
      link: "/quotes",
      isAuthRequired: true,
      paths: ["/quotes"],
      icon: "RateReviewIcon",
    },
  ],
};

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});
export default menu.reducer;
