import { Dispatch } from "redux";
import { AxiosInstance } from "axios";

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser =
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const res = await api.post("", {
      query: `
        query {
          currentUser {
            ID
            name
            type
          }
        }
      `,
    });

    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res,
    });
  };

export const LOG_IN_USER = "log_in_user";
export const loginUser =
  (variables: { name: string; password: string }) =>
  async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const res = await api.post("", {
      query: `
        mutation ($name: String!, $password: String!) {
          login(name: $name, password: $password) {
            ID
            name
            type
          }
        }
      `,
      variables,
    });

    dispatch({
      type: LOG_IN_USER,
      payload: res,
    });
  };

export const LOG_OUT_USER = "log_out_user";
export const logout =
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const res = await api.post("", {
      query: `
        query {
          logout {
            success
          }
        }
    `,
    });

    dispatch({
      type: LOG_OUT_USER,
      payload: res,
    });
  };
