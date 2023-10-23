import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./TasksSlice";
import { userReducer } from "./UserSlice";
let store = configureStore({
  reducer: {
    tasksRed: tasksReducer,
    userRed: userReducer,
  },
});

export default store;
