import React from "react";
import {Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons/faCoffee";

export default function Footer() {
  return (
      <Container>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <FontAwesomeIcon icon={faCoffee}/>
            </a>
            <span className="text-muted">© 2021 Company, Inc</span>
          </div>
        </footer>
      </Container>
  );
}