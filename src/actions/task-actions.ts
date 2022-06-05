import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {getTasksReducerChoices} from "../store/reducers/task-reducers";
import {AppState} from "../store/store";

export function getTasksAction() {
  return async function (dispatch: Dispatch, getState: AppState) {
    try {
      dispatch({type: getTasksReducerChoices.loading});
      const {authLogin: {user}} = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`
        }
      };
      const {data: tasks} = await axios.get('http://localhost:8000/api/v1/tasks/', config);
      dispatch({type: getTasksReducerChoices.success, payload: tasks});
    } catch (error) {
      const errorData = {
        messages: (<AxiosError>error).response?.data,
        status: (<AxiosError>error).response?.status
      };
      dispatch({type: getTasksReducerChoices.error, payload: errorData});
    }
  }
}