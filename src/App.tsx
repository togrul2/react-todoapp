import React, {Suspense} from "react";
import Layout from "./components/layout/Layout";
import {Navigate, Route, Routes} from "react-router-dom";
import Loader from "./components/ui/Loader";

const Register = React.lazy(() => import('./pages/auth/Register')),
    Login = React.lazy(() => import('./pages/auth/Login')),
    Tasks = React.lazy(() => import('./pages/task/Tasks')),
    CreateTask = React.lazy(() => import('./pages/task/CreateTask')),
    NotFound = React.lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
      <Layout>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path='/' element={<Navigate to='/tasks'/>}/>
            <Route path='/tasks' element={<Tasks/>}/>
            <Route path='/create-task' element={<CreateTask/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={''}/>
            <Route path='/task/:taskId' element={''}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </Layout>
  );
}
