import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { AxiosInstance } from "axios";

const getRandomSentence =
  // @ts-ignore
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const result = { data: "test sentence" };
    // await api.get(
    //   "https://jsonplaceholder.typicode.com/users/1"
    // );
    dispatch(printSentence(result.data));
  };

const generateGameId = () => (dispatch: Dispatch) => {
  const newGameId = Math.random().toString(36).substring(2, 7);
  dispatch(assignGameId(newGameId));
};

const sendKeyPress =
  (variables: { gameId: string; key: string }) =>
  async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    return await api.post("", {
      query: `
        mutation KeyPress ($gameId: String!, $key: String!) {
          keyPress(gameId: $gameId, key: $key) {
            key
          }
        }
      `,
      variables,
    })
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
    updateGame: (state, action) => {
      state.letter = action.payload;
    },
    printSentence: (state, action) => {
      state.sentence = action.payload.split("");
    },
  },
});

export const { assignGameId, updateGame, printSentence } =
  gameSlice.actions;
export { getRandomSentence, generateGameId, sendKeyPress };
export default gameSlice.reducer;
