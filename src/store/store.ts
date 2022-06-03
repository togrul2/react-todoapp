import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth-slice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

export default store;
export type AppDispatch = typeof store.dispatch;