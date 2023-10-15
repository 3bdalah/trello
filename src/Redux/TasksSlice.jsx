import { createSlice } from "@reduxjs/toolkit";

let initialState = { tasks: [], counterTasks: 0 };
let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export let tasksReducer = tasksSlice.reducer;
export let { add, remove, edit } = tasksSlice.actions;
