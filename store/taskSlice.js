import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasks(state, action) {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addTaskSuccess(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const getTasks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("http://localhost:8000/api/v1/tasks");
    const data = await response.json();
    dispatch(fetchTasks(data));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addTask = (newTask) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/tasks",
      newTask
    );
    if (response.status === 200) {
      console.log("Task posted successfully");
    }
    dispatch(addTaskSuccess(newTask));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const { fetchTasks, setLoading, addTaskSuccess } = taskSlice.actions;
export default taskSlice.reducer;
