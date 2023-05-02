import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button, Table, Modal, Form, Alert } from "react-bootstrap";
import getToken from "../../token/getToken";

const TeamManagement = () => {
  const { id } = useParams();
  //   const history = useHistory();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showRemoveTaskModal, setShowRemoveTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [assignee, setAssignee] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the team data and members list from the server
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/team/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        console.log(response.data);
        setTeam(response.data);
        setMembers(response.data.members);
        setTasks(response.data.tasks);
        console.log(tasks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeamData();
  }, [id]);

  // Handle form submit to add a new member to the team
  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/teams/${id}/members`, {
        memberId: newMember,
      });
      setMembers(response.data.members);
      setShowAddMemberModal(false);
      setNewMember("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Handle form submit to remove a task from the team
  const handleRemoveTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/api/teams/${id}/tasks/${selectedTask._id}`
      );
      setTasks(response.data.tasks);
      setShowRemoveTaskModal(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Handle form submit to remove a member from the team
  const handleRemoveMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/api/teams/${id}/members/${newMember}`
      );
      setMembers(response.data.members);
      setShowRemoveMemberModal(false);
      setNewMember("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Handle form submit to create a new task
  const handleCreateTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/teams/${id}/tasks`, newTask);
      setTasks(response.data.tasks);
      setShowCreateTaskModal(false);
      setNewTask({ name: "", description: "" });
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // Handle form submit to assign a task to a team member
  const handleAssignTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/teams/${id}/tasks/${selectedTask._id}/assign`,
        { assignee }
      );
      setTasks(response.data.tasks);
      setShowAssignTaskModal(false);
      setAssignee("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container className="my-4">
      <h2>{team ? team.name : "Loading..."}</h2>
      {/* Members table */}
      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Members</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setShowRemoveMemberModal(true);
                    setNewMember(member._id);
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add member modal */}
      <Modal
        show={showAddMemberModal}
        onHide={() => {
          setShowAddMemberModal(false);
          setNewMember("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMemberSubmit}>
            <Form.Group controlId="memberId">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter member ID"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Remove member modal */}
      <Modal
        show={showRemoveMemberModal}
        onHide={() => {
          setShowRemoveMemberModal(false);
          setNewMember("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this member?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowRemoveMemberModal(false);
              setNewMember("");
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveMemberSubmit}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tasks table */}
      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Assigned To</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.assignee ? task.assignee.name : "Unassigned"}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowAssignTaskModal(true);
                  }}
                  disabled={!task.assignee}
                >
                  Reassign
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setShowRemoveTaskModal(true);
                    setSelectedTask(task);
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Remove Task Modal */}
      <Modal
        show={showRemoveTaskModal}
        onHide={() => setShowRemoveTaskModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove the task "{selectedTask?.name}"?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRemoveTaskModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveTaskSubmit}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Task Modal */}
      <Modal
        show={showCreateTaskModal}
        onHide={() => setShowCreateTaskModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleCreateTaskSubmit}>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreateTaskModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
};

export default TeamManagement;
