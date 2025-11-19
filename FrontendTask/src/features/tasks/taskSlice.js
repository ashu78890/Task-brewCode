import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
// GET Tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (_, thunkAPI) => {
  try {
    return await api.request("/tasks");
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// CREATE
export const createTask = createAsyncThunk("tasks/create", async (task, thunkAPI) => {
  try {
    await api.request("/tasks", "POST", task);
    return await api.request("/tasks"); // Refresh
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// UPDATE
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      await api.request(`/tasks/${id}`, "PUT", updates);
      return await api.request("/tasks");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteTask = createAsyncThunk("tasks/delete", async (id, thunkAPI) => {
  try {
    await api.request(`/tasks/${id}`, "DELETE");
    return await api.request("/tasks");
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default taskSlice.reducer;
