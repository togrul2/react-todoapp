import React from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserData, LoginReducerState} from "../../store/reducers/auth-reducers";
import {AppDispatch} from "../../store/store";
import {logoutAction} from "../../actions/auth-actions";


export default function Header() {
  const {user} = useSelector<LoginReducerState, LoginData>(state => state.authLogin);
  const isAuthenticated = user !== null;
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>TodoApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated && (<Link className='nav-link' to='/tasks'>Tasks</Link>)}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                  <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                    <Link className='dropdown-item' to='/profile'>Profile</Link>
                    <NavDropdown.Divider/>
                    <button onClick={logoutHandler} className='dropdown-item'>Sign out</button>
                  </NavDropdown>
              ) : (
                  <React.Fragment>
                    <Nav>
                      <Link to='/login' className='nav-link'>
                        <Button variant='light' size='sm'>Sign in</Button>
                      </Link>
                      <Link to='/register' className='nav-link'>
                        <Button variant='outline-light' size='sm'>Sign up</Button>
                      </Link>
                    </Nav>
                  </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}