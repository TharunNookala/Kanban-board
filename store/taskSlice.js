import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const getTasks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("http://localhost:8000/api/v1/tasks");
    const data = response.json();
    dispatch(fetchTasks(data));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { fetchTasks } = taskSlice.actions;
export default taskSlice.reducer;
