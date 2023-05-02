import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import getToken from "../../token/getToken";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let task = false;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const { title, description, dueDate, priority } = formData;

  useEffect(() => {
    if (id) {
      const task_id = id;
      axios
        .get(`http://localhost:3001/task/${task_id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          const task = response.data;
          setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(`Error: ${error.response.status}`);
        });
    }
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (id) {
        response = await axios.put(
          `http://localhost:3001/task/${id}`,
          {
            title,
            description,
            dueDate,
            priority,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3001/task",
          {
            title,
            description,
            dueDate,
            priority,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
      }

      if (response.status === 200) {
        setShowSuccess(true);
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "",
        });
        navigate("/tasks", { replace: true });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.response.status}`);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>{id ? "Modify" : "Create"} Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={title || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="description"
                value={description || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={dueDate || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={priority || ""}
                onChange={handleChange}
              >
                <option value="">Select priority level</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {id ? "Modify" : "Create"} Task
            </Button>
          </Form>
          {showSuccess && (
            <Alert variant="success" className="mt-3">
              Task saved successfully.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
  
  

};

export default CreateTask;
