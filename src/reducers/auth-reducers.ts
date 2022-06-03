import {PayloadAction} from "@reduxjs/toolkit";

interface userState {
  user?: object | null,
  loading?: boolean,
  error?: object | null
}

export const initialState = {
  user: null,
  loading: false,
  error: null
}

export function loginReducer(state: userState = initialState, action: PayloadAction<userState>) {
  state.user = action.payload.user;
  state.loading = action.payload.loading;
  state.error = action.payload.error;
}

export function registerReducer(state: userState = initialState, action: PayloadAction<userState>) {
  state.user = action.payload.user;
  state.loading = action.payload.loading;
  state.error = action.payload.error;
}