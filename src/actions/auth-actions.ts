import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {authActions} from "../store/auth-slice";
import {initialState} from "../reducers/auth-reducers";

interface Credentials {
  username: string;
  password: string;
  remember_me: boolean;
}

export interface Auth {
  type: string;
  loading?: boolean;
  user?: object;
  error?: any;
}

export function loginAction(credentials: Credentials) {
  return async function (dispatch: Dispatch<Auth>) {
    try {
      dispatch(authActions.loginReducer({...initialState, loading: true}));
      const data = {
        username: credentials.username,
        password: credentials.password
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const {data: user} = await axios.post('http://localhost:8000/api/v2/login/', data, config);
      dispatch(authActions.loginReducer({
        ...initialState,
        user
      }));
      if(credentials.remember_me) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error: AxiosError | any) {
      dispatch(authActions.loginReducer({
        ...initialState,
        error: {
          messages: error.response.data,
          status: error.response.status
        }
      }));
    }
  }
}

export function logoutAction() {
  return function (dispatch: Dispatch<Auth>) {
    dispatch(authActions.loginReducer(initialState));
    if(localStorage.getItem('user') !== null) {
      localStorage.removeItem('user');
    }
  }
}

export function registerAction(data: {username: string, email: string, password: string}) {
  return async function (dispatch: Dispatch<Auth>) {
    try {
      dispatch(authActions.registerReducer({...initialState, loading: true}));
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      await axios.post('http://localhost:8000/api/v2/register/', data, config);
      const credentials = {
        username: data.username,
        password: data.password
      }
      const {data: loginResponseData} = await axios.post('http://localhost:8000/api/v2/login/', credentials, config);
      dispatch(authActions.registerReducer({...initialState, user: loginResponseData}));
    } catch (error: AxiosError | any) {
      dispatch(authActions.registerReducer({
        ...initialState,
        error: {
          messages: error.response.data,
          status: error.response.status
        }
      }))
    }
  }
}