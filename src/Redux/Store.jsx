import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./TasksSlice";
let store = configureStore({
  reducer: {
    tasksRed: tasksReducer,
  },
});

export default store;
