import {createSlice} from "@reduxjs/toolkit";
import {loginReducer, registerReducer} from "../reducers/auth-reducers";

let userDataFromStorage = localStorage.getItem('user');
const userData = (userDataFromStorage !== null) ? JSON.parse(userDataFromStorage) : null;

export interface UserState {
  auth: {
    user: object,
    loading: boolean,
    error: {
      messages: any,
      status: number
    }
  };
}

export interface AuthData {
  user: object | null;
  loading: boolean;
  error: {
    messages: any,
    status: number
  } | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userData
  },
  reducers: {
    loginReducer,
    registerReducer
  }
});

export const authActions = authSlice.actions;