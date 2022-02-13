import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChat: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { updateChat } = chatSlice.actions;
export default chatSlice.reducer;
