import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {createTaskTypes, deleteTaskTypes, getTasksTypes} from "../store/reducers/task-reducers";
import {AppState} from "../store/store";

export function getTasksAction() {
  return async function (dispatch: Dispatch, getState: AppState) {
    try {
      dispatch({type: getTasksTypes.loading});
      const {authLogin: {user}} = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`
        }
      };
      const {data: tasks} = await axios.get('http://localhost:8000/api/v1/tasks/', config);
      dispatch({type: getTasksTypes.success, payload: tasks});
    } catch (error) {
      const errorData = {
        messages: (<AxiosError>error).response?.data,
        status: (<AxiosError>error).response?.status
      };
      dispatch({type: getTasksTypes.error, payload: errorData});
    }
  }
}

type TaskData = {
  title: string,
  content: string,
  deadline: Date,
  status_id: number
}

export function createTaskAction(task: TaskData) {
  return async function (dispatch: Dispatch, getState: AppState) {
    try {
      dispatch({type: createTaskTypes.loading});
      const {authLogin: {user}} = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`
        }
      };
      const {data} = await axios.post('http://localhost:8000/api/v1/tasks/', task, config);
      dispatch({type: createTaskTypes.success, payload: data});
    } catch (error) {
      const errorData = {
        messages: (<AxiosError>error).response?.data,
        status:  (<AxiosError>error).response?.status
      };
      dispatch({type: createTaskTypes.error, payload: errorData});
    }
  }
}

export function deleteTaskAction(task_id: string) {
  return async function(dispatch: Dispatch, getState: AppState) {
    try {
      dispatch({type: deleteTaskTypes.loading});
      const {authLogin: {user}} = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`
        }
      }
      await axios.delete(`http://localhost:8000/api/v1/task/${task_id}`, config);
      dispatch({type: deleteTaskTypes.success});
    } catch (error) {
      const errorData = {
        messages: (<AxiosError>error).response?.data,
        status:  (<AxiosError>error).response?.status,
      };
      dispatch({type: deleteTaskTypes.error, payload: errorData});
    }
  }
}