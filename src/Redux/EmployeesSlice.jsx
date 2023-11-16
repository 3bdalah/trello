import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let handleGetAllEmployee = createAsyncThunk(
  "employees/handleGetAllEmployee",
  async () => {
    try {
      let { data } = await axios.get(
        "https://trello-backend-tlg1.onrender.com/getAllUsers",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data.users;
    } catch (error) {
      console.log("errors get all users", error);
    }
  }
);

let initialState = {
  allEmployees: [],
  counterEmployees: 0,
  loaded: false,
};
let employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleGetAllEmployee.fulfilled, (state, action) => {
      state.allEmployees = action.payload;
      state.counterEmployees = state.allEmployees.length;
      state.loaded = true;
    });
  },
});

export let employeesReducer = employeesSlice.reducer;
