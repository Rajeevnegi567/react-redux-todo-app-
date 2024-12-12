import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Async action for fetching tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 10); // Limit to 10 tasks
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle" },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
