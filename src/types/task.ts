import {StateError} from "./index";

export type Status = 'Pending' | 'Done' | 'Delayed' | 'Canceled';

export interface Task {
  id: string
  title: string;
  content: string;
  deadline: Date;
  created_at: Date;
  status: Status;
  done_at: Date;
  author_id: string;
}

export interface GetTaskReducerState {
  getTasks: {
    tasks: Array<Task>,
    loading: boolean,
    error: StateError | null
  };
}

export interface CreateTaskReducerState {
  createTask: {
    task: Task | null,
    loading: boolean,
    error: StateError
  }
}

export interface TasksData {
  tasks: Array<Task>;
  loading: boolean;
  error: StateError | null;
}

export interface TaskData {
  task: Task | null;
  loading: boolean;
  error: StateError | null
}