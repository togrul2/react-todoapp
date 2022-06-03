import React, {useEffect, useRef} from "react";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {loginAction} from "../../actions/auth-actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from '../../store/store';
import {AuthData, UserState} from "../../store/auth-slice";
import Loader from "../../components/ui/Loader";

export default function Login() {
  const username_input = useRef<HTMLInputElement>(null!);
  const password_input = useRef<HTMLInputElement>(null!);
  const remember_me_input = useRef<HTMLInputElement>(null!);
  const {user, loading: authLoading, error: authError} = useSelector<UserState, AuthData>(state => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if(user !== null) {
      navigate('/');
    }
  }, [user]);

  const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = username_input.current.value;
    const password = password_input.current.value;
    const remember_me = remember_me_input.current.checked;
    if (!username || !password) {
      console.log("All fields must be provided");
    } else {
      const data = {username, password, remember_me};
      dispatch(loginAction(data)).then();
    }
  };

  return (
      <Container className='login-container my-5'>
        {authLoading ? <Loader/> : (
            <Form onSubmit={loginSubmitHandler}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control ref={username_input} type="text" placeholder="Enter username"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={password_input} type="password" placeholder="Password"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="remember_me">
                <Form.Check ref={remember_me_input} type="checkbox" label="Remember me"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              {authError && <Alert className='mt-4' variant='danger'>{authError.message}</Alert>}
            </Form>
        )}
      </Container>
  );
}