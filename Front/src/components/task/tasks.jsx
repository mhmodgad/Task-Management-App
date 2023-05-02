import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import getToken from "../../token/getToken";
import { FaEdit, FaTrash } from "react-icons/fa";
import Task from "../../models/task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/task", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          sortBy,
        },
      })
      .then((response) => {
        const tasksFromApi = response.data.map(
          (task) =>
            new Task(
              task._id,
              task.title,
              task.description,
              task.status,
              task.duedate,
              task.priority
            )
        );
        setTasks(tasksFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortBy]);

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3001/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Task List</h1>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("priority")}>
                Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("deadline")}>
                Deadline
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>
                    <Link to={`/task/${task._id}`}>
                      <FaEdit className="mr-2" style={{ cursor: "pointer" }} />
                    </Link>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(task._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Link to="/task">
        <Button variant="primary" className="floating-btn">
          Add Task
        </Button>
      </Link>
    </Container>
  );
};

export default TaskList;
