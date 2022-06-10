import {PayloadAction} from "@reduxjs/toolkit";
import {TaskData, TasksData} from "../../types/task";

const tasksInitialState: TasksData = {
  tasks: [],
  loading: false,
  error: null
};

const taskInitialState: TaskData = {
  task: null,
  loading: false,
  error: null
}

export enum getTasksTypes {
  loading = 'tasks/get/loading',
  success = 'tasks/get/success',
  error = 'tasks/get/error',
}

export enum createTaskTypes {
  loading = 'tasks/create/loading',
  success = 'tasks/create/success',
  error = 'tasks/create/error',
}

export enum deleteTaskTypes {
  loading = 'tasks/delete/loading',
  success = 'tasks/delete/success',
  error = 'tasks/delete/error'
}

export function getTasksReducer(state: TasksData = tasksInitialState, action: PayloadAction) {
  switch (action.type) {
    case getTasksTypes.loading:
      return {...state, loading: true};
    case getTasksTypes.success:
      return {...state, loading: false, tasks: action.payload};
    case getTasksTypes.error:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}

export function createTaskReducer(state: TaskData = taskInitialState, action: PayloadAction) {
  switch (action.type) {
    case createTaskTypes.loading:
      return {...state, loading: true};
    case createTaskTypes.success:
      return {...state, loading: false, task: action.payload};
    case createTaskTypes.error:
      return {...state, loading: false, task: action.payload};
    default:
      return state;
  }
}

export function deleteTaskReducer(state = {deleted: false, loading: false, error: null}, action: PayloadAction) {
  switch (action.type) {
    case deleteTaskTypes.loading:
      return {...state, loading: true};
    case deleteTaskTypes.success:
      return {...state, loading: false, deleted: true};
    case deleteTaskTypes.error:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}