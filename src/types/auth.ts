import {StateError} from "./index";

export interface User {
  access: string;
  refresh: string;
  username: string;
  email: string;
}

export interface UserState {
  user?: User | null,
  loading?: boolean,
  error?: StateError | null
}

export interface LoginReducerState {
  authLogin: {
    user: User | null,
    loading: boolean,
    error: StateError | null
  }
}

export interface RegisterReducerState {
  authRegister: {
    user: User | null,
    loading: boolean,
    error: StateError | null
  }
}

export interface UserData {
  user: User | null;
  loading: boolean;
  error: StateError | null;
}
