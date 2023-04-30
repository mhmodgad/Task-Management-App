import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "./footer";
import Navigation from "./navbar";

const Home = () => {
  return (
    <div>
      <Navigation/>
      <Container className="my-5">
        <Row>
          <Col>
            <h1>Welcome to Task Manager</h1>
            <p className="lead">
              Task Manager is a simple and powerful task management application
              designed to help you manage your tasks more effectively and
              efficiently.
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Organize Your Tasks</Card.Title>
                <Card.Text>
                  With Task Manager, you can easily create, organize and manage
                  your tasks in one central location. Keep track of deadlines,
                  priorities, and progress with our intuitive task management
                  system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Features</h2>
            <ul>
              <li>Create and manage tasks</li>
              <li>Set priorities and deadlines</li>
              <li>Collaborate with team members</li>
              <li>Track progress and completion</li>
              <li>Intuitive and easy-to-use interface</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
