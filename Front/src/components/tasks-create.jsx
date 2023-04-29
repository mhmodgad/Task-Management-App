import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const { title, description, dueDate, priority } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add create task logic
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter task due date"
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={priority}
                onChange={handleChange}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTask;
