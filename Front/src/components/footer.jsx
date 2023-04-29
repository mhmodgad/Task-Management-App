import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#343a40", marginTop: "2rem" }}>
      <Container>
        <Row>
          <Col className="text-center py-3 text-light">
            <h5>Some Extra Info</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              © 2023 by My Awesome Site. Proudly created with React & Bootstrap.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
