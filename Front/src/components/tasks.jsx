import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/task").then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Task List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Link to="/create">
        <Button variant="primary" className="floating-btn">
          Add Task
        </Button>
      </Link>
    </Container>
  );
};

export default TaskList;
