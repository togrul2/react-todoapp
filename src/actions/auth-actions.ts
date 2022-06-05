import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {loginReducerType, registerReducerType} from "../store/reducers/auth-reducers";

interface Credentials {
  username: string;
  password: string;
  remember_me: boolean;
}

export function loginAction(credentials: Credentials) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch({type: loginReducerType.loading});
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
      dispatch({type: loginReducerType.success, payload: user});
      if (credentials.remember_me) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      const errorData = {
        messages: (<AxiosError>error).response?.data,
        status: (<AxiosError>error).response?.status
      };
      dispatch({type: loginReducerType.error, payload: errorData});
    }
  }
}

export function logoutAction() {
  return function (dispatch: Dispatch) {
    dispatch({type: loginReducerType.logout});
    if (localStorage.getItem('user') !== null) {
      localStorage.removeItem('user');
    }
  }
}

export function registerAction(data: { username: string, email: string, password: string }) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch({type: registerReducerType.loading});
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
      dispatch({type: registerReducerType.success, user: loginResponseData});
      dispatch({type: loginReducerType.success, user: loginResponseData});
      localStorage.setItem('user', JSON.stringify(loginResponseData));
    } catch (error) {
      const errorData = {
        messages: (<AxiosError>error).response?.data,
        status: (<AxiosError>error).response?.status
      };
      dispatch({type: registerReducerType.error, error: errorData});
    }
  }
}