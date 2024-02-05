import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo-slice";
import User from "./features/user-slice";
import MenuItems from "./features/menu-slice";
import Quotes from "./features/quotes-slice";

export const store = configureStore({
  reducer: {
    User,
    MenuItems,
    Quotes,
    todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
