import { Dispatch } from "redux";
import { AxiosInstance } from "axios";

export const FETCH_QUESTIONS = "fetch_questions";
export const fetchQuestions =
  () =>
  async (
    dispatch: Dispatch,
    getState: Function,
    api: AxiosInstance
  ): Promise<void> => {
    // TODO: change to fetch (what about server side?)
    const res = await api.post(
      // no path needed as it is set for both
      // server and front when setting up
      // axiosInstance with appropriate url param
      "",
      {
        query: `
          query ($cursor: String, $limit: Int) {
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

    dispatch({
      type: FETCH_QUESTIONS,
      payload: res,
    });
  };

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser =
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const res = await api.post("", {
      query: `
        query ($ID: ID!) {
          user(ID: $ID) {
            ID
            RecordType
            name
            score
            type
            date
          }
        }
    `,
      variables: {
        ID: "",
      },
    });

    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res,
    });
  };
