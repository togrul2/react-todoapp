import React from "react";
import {Container, Spinner} from "react-bootstrap";

export default function Loader() {
  return (
      <Container className='text-center' style={{height: '20rem'}}>
        <Spinner animation='border'/>
      </Container>
  );
}