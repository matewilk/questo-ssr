import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { AxiosInstance } from "axios";

const fetchQuestions =
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    // TODO: change to fetch (what about server side?)
    const result: Questions = await api.post(
      // no path needed as it is set for both
      // server and front when setting up
      // axiosInstance with appropriate url param
      "",
      {
        query: `
          query Questions ($cursor: String, $limit: Int) {
            questions (cursor: $cursor, limit: $limit) {
              edges {
                ID
                RecordType
                text
                popularity
                category
                date
              }
              pageInfo {
                cursor
                count
              }
            }
          }
      `,
      }
    );

    dispatch(reduceQuestions(result));
  };

type Question = {
  text: string;
};

type PageInfo = {
  count: number;
  cursor: string;
};

export interface Questions {
  edges: Question[];
  pageInfo: PageInfo;
}

const initialState: { questions: Questions } = {
  questions: { edges: [], pageInfo: { count: 0, cursor: null } },
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reduceQuestions: (state, action) => {
      state.questions = action.payload.data.data.questions;
    },
  },
});

export const { reduceQuestions } = questionsSlice.actions;
export { fetchQuestions };
export default questionsSlice.reducer;
