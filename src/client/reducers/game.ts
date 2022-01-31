import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  sentence: string[];
  letter: string;
}

const initialState: GameState = {
  sentence: ["m", "a", "t", "e", "w", "i", "l", "k"],
  letter: "",
};

const getRandomSentence = createAsyncThunk(
  "game/getRandomSentence",
  async (args, { extra }) => {
    const result = await fetch("https://jsonplaceholder.typicode.com/users/1");
    return await result.json();
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectLetter: (state, action: PayloadAction<any>) => {
      state.letter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRandomSentence.fulfilled, (state, action) => {
      state.sentence = action.payload.name.split("");
    });
  },
});

export const { selectLetter } = gameSlice.actions;
export { getRandomSentence };
export default gameSlice.reducer;
