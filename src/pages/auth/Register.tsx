import React, {useEffect, useRef, useState} from "react";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useInput} from "../../hooks/use-input";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {registerAction} from "../../actions/auth-actions";
import {AuthData, UserRegisterState} from '../../store/reducers/auth-reducers';
import Loader from "../../components/ui/Loader";

export default function Register() {
  const [isValidated, setIsValidated] = useState(false);
  const {
    value: username,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: usernameReset
  } = useInput(value => !(value.length < 6 || /\s+/.test(value)));

  const {
    value: email,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput(value => value.length !== 0);

  const {
    value: password,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset
  } = useInput(value => !(value.length === 0 || !/^[A-Z][\w-]{6,}$/.test(value)));

  const {
    value: confirmPassword,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset
  } = useInput(value => value === password);

  const {user, loading, error} = useSelector<UserRegisterState, AuthData>(state => state.authRegister);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accept_input = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (user !== null) {
      navigate('/tasks/')
    }
  }, [user]);

  const registerSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {username, email, password};
    dispatch(registerAction(data)).then();
    if (!error) {
      navigate('/tasks/');
      usernameReset();
      emailReset();
      passwordReset();
      confirmPasswordReset();
    }
    setIsValidated(true);
  };

  return (
      <React.Fragment>
        {loading ? (
            <Loader/>
        ) : (
            <Container className='login-container my-5'>
              <Form noValidate validated={isValidated} onSubmit={registerSubmitHandler}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={usernameChangeHandler}
                      onBlur={usernameBlurHandler}
                      isInvalid={usernameHasError}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Username must be at least 6 characters and should not contain whitespaces
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                      required
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      isInvalid={emailHasError}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Email is invalid
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      required
                      type='password'
                      placeholder='Enter a password'
                      value={password}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      isInvalid={passwordHasError}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Password Must start with capital letter and contain at least 7 characters
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                      required
                      type="password"
                      placeholder="Enter Password Again"
                      value={confirmPassword}
                      onChange={confirmPasswordChangeHandler}
                      onBlur={confirmPasswordBlurHandler}
                      isInvalid={confirmPasswordHasError}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Passwords do not match
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="rules">
                  <Form.Check
                      required
                      type="checkbox"
                      feedback='Must accept terms and conditions'
                      feedbackType="invalid"
                      ref={accept_input}
                      label={(
                          <span>I accept all <Link to='/rules'>rules</Link> and conditions</span>
                      )}/>
                </Form.Group>
                <Button variant="primary" type="submit">Sign up</Button>
              </Form>
              {error && error.messages.keys.map((key: string) => (
                  <Alert variant='danger'>{error.messages[key]}</Alert>))}
            </Container>
        )}
      </React.Fragment>
  );
}