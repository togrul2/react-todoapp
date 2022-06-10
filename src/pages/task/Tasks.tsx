import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Alert, Container} from "react-bootstrap";

import {AppDispatch} from "../../store/store";
import {getTasksAction} from "../../actions/task-actions";
import Loader from "../../components/ui/Loader";
import Cards from "../../components/task/Cards";
import {LoginReducerState, UserData} from "../../types/auth";
import {TasksData, GetTaskReducerState} from "../../types/task";

export default function Tasks() {
  const {user} = useSelector<LoginReducerState, UserData>(state => state.authLogin);
  const {tasks, loading, error} = useSelector<GetTaskReducerState, TasksData>(state => state.getTasks);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login/');
    } else {
      dispatch(getTasksAction()).then();
    }
  }, [user, dispatch]);

  return (
      <Container style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1>Tasks</h1>
        {loading && <Loader/>}
        {tasks !== null && <Cards tasks={tasks}/>}
        {error && error.status === 401 && (
            <Alert variant='danger'>Problem with authorization. Make sure you are logged in and your session hasn't expired!</Alert>
        )}
      </Container>
  );
}