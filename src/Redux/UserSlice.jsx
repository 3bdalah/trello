import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataUser = createAsyncThunk(
  "user/getDataUser",
  async function () {
    const { data } = await axios.get(
      "https://trello-backend-tlg1.onrender.com/getUser",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
);

let initialState = { user: {} };
let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export let userReducer = userSlice.reducer;
