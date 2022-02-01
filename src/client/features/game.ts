import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { AxiosInstance } from "axios";

// const getRandomSentence = createAsyncThunk(
//   "game/getRandomSentence",
//   async (args, { dispatch, getState, extra }) => {
//     const result = await fetch("https://jsonplaceholder.typicode.com/users/1");
//     return await result.json();
//   }
// );

const getRandomSentence =
  // @ts-ignore
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const result = await api.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    dispatch(printSentence(result.data));
  };

export interface GameState {
  sentence: string[];
  letter: string;
}

const initialState: GameState = {
  sentence: [],
  letter: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectLetter: (state, action: PayloadAction<any>) => {
      state.letter = action.payload;
    },
    printSentence: (state, action) => {
      state.sentence = action.payload.name.split("");
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getRandomSentence.fulfilled, (state, action) => {
  //     state.sentence = action.payload.name.split("");
  //   });
  // },
});

export const { selectLetter, printSentence } = gameSlice.actions;
export { getRandomSentence };
export default gameSlice.reducer;
