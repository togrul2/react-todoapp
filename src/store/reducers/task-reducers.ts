import {PayloadAction} from "@reduxjs/toolkit";

interface TaskState {
  tasks?: [];
  loading?: boolean;
  errors?: object | null;
}

export type Status = 'Pending' | 'Done' | 'Delayed' | 'Canceled';

export interface Task {
  id: string
  title: string;
  context: string;
  deadline: Date;
  created_at: Date;
  status: Status;
  done_at: Date;
  author_id: string;
}

export interface TaskReducerState {
  getTasks: {
    tasks: Array<Task>,
    loading: boolean,
    error: {
      messages: Map<string, string>,
      status: number
    }
  };
}

export interface TaskData {
  tasks: Array<Task>;
  loading: boolean;
  error: {
    messages: Map<string, string>,
    status: number
  }
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  errors: null
};

export enum getTasksReducerChoices {
  loading = 'tasks/get/loading',
  success = 'tasks/get/success',
  error = 'tasks/get/error',
}

export function getTasksReducer(state: TaskState = initialState, action: PayloadAction) {
  switch (action.type) {
    case getTasksReducerChoices.loading:
      return {...state, loading: true};
    case getTasksReducerChoices.success:
      return {...state, loading: false, tasks: action.payload};
    case getTasksReducerChoices.error:
      return {...state, loading: false, errors: action.payload};
    default:
      return state;
  }
}