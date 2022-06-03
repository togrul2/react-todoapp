import React, {useRef, useState} from "react";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useInput} from "../../hooks/use-input";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {registerAction} from "../../actions/auth-actions";
import {AuthData, UserState} from "../../store/auth-slice";

export default function Register() {
  const [isValidated, setIsValidated] = useState(false);
  const {
    value: username,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
    reset: usernameReset
  } = useInput(value => {
    if (value.length === 0) {
      return false;
    } else if (value.length > 0 && value.length < 6) {
      return false;
    } else return !/\s+/.test(value);
  });

  const {
    value: email,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput(value => {
    return value.length !== 0;
  });

  const {
    value: password,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset
  } = useInput(value => {
    if (value.length === 0) {
      return false;
    } else if (!/^[A-Z][\w-]{6,}$/.test(value)) {
      return false;
    }
    return true;
  });

  const {
    value: confirmPassword,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset
  } = useInput(value => {
    return value === password;
  });
  const {user, loading, error} = useSelector<UserState, AuthData>(state=>state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accept_input = useRef<HTMLInputElement>(null!);

  const registerSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usernameHasError && !emailHasError && !passwordHasError && !confirmPasswordHasError && accept_input.current.checkValidity()) {
      setIsValidated(true);
      const data = {username, email, password};
      dispatch(registerAction(data)).then();
      if (!error) {
        navigate('/login/');
        usernameReset();
        emailReset();
        passwordReset();
        confirmPasswordReset();
      }
    } else {
      setIsValidated(false);
    }
  };

  return (
      <Container className='login-container my-5'>
        <Form noValidate validated={isValidated} onSubmit={registerSubmitHandler}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
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
                isInvalid={accept_input.current && !accept_input.current.checkValidity()}
                label={(
                    <span>I accept all <Link to='/rules'>rules</Link> and conditions</span>
                )}/>
          </Form.Group>
          <Button variant="primary" type="submit">Sign up</Button>
        </Form>
        {error && (<Alert variant='danger'>{error.message}</Alert>)}
      </Container>
  );
}