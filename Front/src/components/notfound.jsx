import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center h-100">
      <Row>
        <Col className="text-center">
          <h1>404 Not Found</h1>
          <p>We can't seem to find the page you're looking for.</p>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
