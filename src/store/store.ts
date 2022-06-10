import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {loginReducer, registerReducer} from "./reducers/auth-reducers";
import {createTaskReducer, deleteTaskReducer, getTasksReducer} from "./reducers/task-reducers";

let userDataFromStorage = localStorage.getItem('user');
const user = (userDataFromStorage !== null) ? JSON.parse(userDataFromStorage) : null;

const store = configureStore({
  preloadedState: {
    authLogin: {user}
  },
  reducer: combineReducers({
    authLogin: loginReducer,
    authRegister: registerReducer,
    getTasks: getTasksReducer,
    createTask: createTaskReducer,
    deleteTask: deleteTaskReducer
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
