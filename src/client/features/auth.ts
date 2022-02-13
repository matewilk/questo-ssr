import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { AxiosInstance } from "axios";

export const fetchCurrentUser =
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const result = await api.post("", {
      query: `
        query CurrentUser {
          currentUser {
            ID
            name
            type
          }
        }
      `,
    });

    dispatch(currentUser(result));
  };

export const loginUser =
  (variables: { name: string; password: string }) =>
  async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const result = await api.post("", {
      query: `
        mutation Login ($name: String!, $password: String!) {
          login(name: $name, password: $password) {
            ID
            name
            type
          }
        }
      `,
      variables,
    });

    dispatch(logIn(result));
  };

export const logout =
  () => async (dispatch: Dispatch, getState: Function, api: AxiosInstance) => {
    const result = await api.post("", {
      query: `
        query Logout {
          logout {
            success
          }
        }
    `,
    });

    dispatch(logOut(result));
  };

const initialState: object = { logged: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      const user = action.payload.data.data.currentUser || false;
      return { logged: !!user, ...user };
    },
    logIn: (state, action) => {
      const user = action.payload.data.data.login || false;
      return { logged: !!user, ...user };
    },
    logOut: (state, action) => {
      return { logged: !action.payload.data.data.logout.success };
    },
  },
});

export const { currentUser, logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
