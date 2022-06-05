import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AuthData, UserLoginState} from "../store/reducers/auth-reducers";
import {Alert, Card, Container} from "react-bootstrap";
import {Color} from "react-bootstrap/types";
import {Status, TaskData, TaskReducerState} from "../store/reducers/task-reducers";
import {AppDispatch} from "../store/store";
import {getTasksAction} from "../actions/task-actions";
import Loader from "../components/ui/Loader";

const getColor = (status: Status): [Color, Color] => {
  const statusPalette: Map<Status, [Color, Color]> = new Map([
      ['Pending', ['light', 'dark']],
      ['Done', ['success', 'light']],
      ['Delayed', ['warning', 'light']],
      ['Canceled', ['danger', 'light']]
  ]);
  return statusPalette.get(status) || ['primary', 'light'];
};

export default function Tasks() {
  const {user} = useSelector<UserLoginState, AuthData>(state => state.authLogin);
  const {tasks, loading, error} = useSelector<TaskReducerState, TaskData>(state => state.getTasks);
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
        {loading ? (
            <Loader/>
        ) : (
            <div style={{
              display: 'flex',
              width: '45rem',
              flexDirection: 'column'
            }}>
              {tasks.map(task => (
                  <Card
                      key={task.id}
                      bg={getColor(task.status)[0]}
                      text={getColor(task.status)[1]}
                      className="mb-2"
                  >
                    <Card.Header>{task.status}</Card.Header>
                    <Card.Body>
                      <Card.Title>{task.title}</Card.Title>
                      <Card.Text>{task.context}</Card.Text>
                    </Card.Body>
                  </Card>
              ))}
            </div>

        )}
        {error && error.status === 401 && (
            <Alert variant='danger'>Problem with authorization. Make sure you are logged in and your session hasn't expired!</Alert>
        )}
      </Container>
  );
}