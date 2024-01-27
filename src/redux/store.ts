import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo-slice";
import User from "./features/user-slice";
import MenuItems from "./features/menu-slice";

export const store = configureStore({
  reducer: {
    User,
    MenuItems,
    todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
