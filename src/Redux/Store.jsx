import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./TasksSlice";
import { userReducer } from "./UserSlice";
import { employeesReducer } from "./EmployeesSlice";
let store = configureStore({
  reducer: {
    tasksRed: tasksReducer,
    userRed: userReducer,
    employeesRed: employeesReducer,
  },
});

export default store;
