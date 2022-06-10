import {PayloadAction} from "@reduxjs/toolkit";
import {UserData, UserState} from "../../types/auth";

export const initialState: UserData = {
  user: null,
  loading: false,
  error: null
}

export enum loginReducerType {
  loading = 'auth/login/loading',
  success = 'auth/login/success',
  error = 'auth/login/error',
  logout = 'auth/login/logout'
}

export enum registerReducerType {
  loading = 'auth/register/loading',
  success = 'auth/register/success',
  error = 'auth/register/error'
}

export function loginReducer(state: UserState = initialState, action: PayloadAction) {
  switch (action.type) {
    case loginReducerType.loading:
      return {...state, loading: true};
    case loginReducerType.success:
      return {...state, loading: false, user: action.payload};
    case loginReducerType.error:
      return {...state, loading: false, error: action.payload};
    case loginReducerType.logout:
      return {...state, loading: false, user: null};
    default:
      return state;
  }
}

export function registerReducer(state: UserState = initialState, action: PayloadAction) {
  switch (action.type) {
    case registerReducerType.loading:
      return {...state, loading: true};
    case registerReducerType.success:
      return {...state, loading: false, user: action.payload};
    case registerReducerType.error:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}
