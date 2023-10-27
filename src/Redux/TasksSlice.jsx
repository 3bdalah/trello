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
export let getAllMyTasksCreated = createAsyncThunk(
  "tasks/getAllMyTasksCreated",
  async function () {
    let { data } = await axios.get(
      "https://trello-backend-tlg1.onrender.com/getaAllTasksForUser",
      { headers: { token: localStorage.getItem("token") } }
    );

    return data.allTasksWithUserData;
  }
);

let initialState = {
  tasksAssignedMe: [],
  tasksCreatedByMe: [],
  createdTasksLength: 0,
  assignendTasksLength: 0,
  counterTasks: 0,
};
let tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMyTasks.fulfilled, (state, action) => {
      state.tasksAssignedMe = action.payload;
      // state.assignendTasksLength = state.tasksAssignedMe.length;
    });
    builder.addCase(getAllMyTasksCreated.fulfilled, (state, action) => {
      state.tasksCreatedByMe = action.payload;
      state.createdTasksLength = state.tasksCreatedByMe.length;
    });
  },
});

export let tasksReducer = tasksSlice.reducer;
