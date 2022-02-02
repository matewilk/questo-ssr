import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
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

const generateGameId = () => (dispatch: Dispatch) => {
  const newGameId = Math.random().toString(36).substring(2, 7);
  dispatch(assignGameId(newGameId));
};

export interface GameState {
  id: string;
  sentence: string[];
  letter: string;
}

const initialState: GameState = {
  id: "",
  sentence: [],
  letter: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    assignGameId: (state, action) => {
      state.id = action.payload;
    },
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

export const { selectLetter, printSentence, assignGameId } = gameSlice.actions;
export { getRandomSentence, generateGameId };
export default gameSlice.reducer;
