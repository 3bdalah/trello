import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let getAllMyTasks = createAsyncThunk(
  "tasks/getAllMyTasks",
  async function () {
    let response = await axios.get(
      "https://trello-backend-tlg1.onrender.com/getaAllTasksAssignedForUser",
      { headers: { token: localStorage.getItem("token") } }
    );
    console.log("log response data ", response.data);
    return response.data;
  }
);

let initialState = {
  tasksAssignedMe: [],
  tasksCreatedByMe: [],
  counterTasks: 0,
};
let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMyTasks.fulfilled, (state, action) => {
      state.tasksAssignedMe = action.payload;
    });
  },
});

export let tasksReducer = tasksSlice.reducer;
export let { add, remove, edit } = tasksSlice.actions;
