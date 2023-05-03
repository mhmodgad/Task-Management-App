import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Button,
  Table,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import getToken from "../../token/getToken";
import AssignTaskModal from "./assignTaskModal";
import CreateTaskModal from "./createTaskModal";
import RemoveMemberModal from "./removeMemberModal";
import AddMemberModal from "./addMemberModal";
import RemoveTaskModal from "./removeTaskModal";
import {
  handleAddMember,
  handleRemoveTask,
  handleRemoveMember,
  handleCreateTask,
  handleAssignTask,
} from "./teamAPI";

const TeamManagement = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showRemoveTaskModal, setShowRemoveTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const [assignee, setAssignee] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(null);
  const [memberSuggestions, setMemberSuggestions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Fetch the team data and members list from the server
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/team/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        // console.log(response.data);

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

  const fetchMemberSuggestions = async (value) => {
    try {
      axios
        .get(`http://localhost:3001/user/search?q=${value}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          const suggestions = response.data.map((member) => member);
          // console.log(suggestions);
          setMemberSuggestions(suggestions);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle form submit to add a new member to the team
  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    await handleAddMember(
      id,
      newMember,
      memberSuggestions,
      setMembers,
      setShowAddMemberModal,
      setNewMember,
      getToken,
      setError
    );
  };

  const handleRemoveTaskSubmit = async (e) => {
    e.preventDefault();
    await handleRemoveTask(
      id,
      selectedTask,
      setTasks,
      setShowRemoveTaskModal,
      setError
    );
  };

  const handleRemoveMemberSubmit = async (e) => {
    e.preventDefault();
    await handleRemoveMember(
      e,
      id,
      newMember,
      setMembers,
      setShowRemoveMemberModal,
      setNewMember,
      getToken,
      setError
    );
  };

  const handleCreateTaskSubmit = async (e) => {
    e.preventDefault();
    await handleCreateTask(
      e,
      id,
      newTask,
      setTasks,
      setShowCreateTaskModal,
      setNewTask,
      setError,
      getToken
    );
  };

  const handleAssignTaskSubmit = async (e) => {
    e.preventDefault();
    await handleAssignTask(
      e,
      id,
      selectedTask,
      assignee,
      setTasks,
      setShowAssignTaskModal,
      setAssignee,
      setError
    );
  };

  const handleCheckboxChange = (e) => {
    const memberId = e.target.value;
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((id) => id !== memberId)
      );
    } else {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        memberId,
      ]);
    }
  };

  return (
    <Container className="my-4">
      <h2>{team ? team.name : "Loading..."}</h2>
      {/* Members table */}
      <Row xs={1} md={2} className="g-4">
        {members &&
          members.map((member) => (
            <Col key={member.name}>
              <Card>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
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
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      {/* Add member modal */}
      <AddMemberModal
        show={showAddMemberModal}
        onHide={() => {
          setShowAddMemberModal(false);
          setNewMember("");
        }}
        handleAddMemberSubmit={handleAddMemberSubmit}
        memberSuggestions={memberSuggestions}
        fetchMemberSuggestions={fetchMemberSuggestions}
        newMember={newMember}
        setNewMember={setNewMember}
      />
      {/* Remove member modal */}

      <RemoveMemberModal
        show={showRemoveMemberModal}
        onHide={() => setShowRemoveMemberModal(false)}
        handleRemoveMemberSubmit={handleRemoveMemberSubmit}
      />

      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>

                <td>{task.assignee ? task.assignee.name : "Unassigned"}</td>
                <td>{task.dueDate}</td>

                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedTask(task);
                      setShowAssignTaskModal(true);
                    }}
                    // disabled={task.assignee}
                  >
                    Assign
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setShowRemoveTaskModal(true);
                      setSelectedTask(task);
                    }}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Tasks table */}
      {/* Remove Task Modal */}
      <RemoveTaskModal
        show={showRemoveTaskModal}
        onHide={() => setShowRemoveTaskModal(false)}
        selectedTask={selectedTask}
        handleRemoveTaskSubmit={handleRemoveTaskSubmit}
      />
      {/* Create Task Modal */}
      <CreateTaskModal
        show={showCreateTaskModal}
        onHide={() => setShowCreateTaskModal(false)}
        newTask={newTask}
        setNewTask={setNewTask}
        error={error}
        handleCreateTaskSubmit={handleCreateTaskSubmit}
      />

      <AssignTaskModal
        show={showAssignTaskModal}
        onHide={() => setShowAssignTaskModal(false)}
        members={members}
        handleAssignTaskSubmit={handleAssignTaskSubmit}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Button onClick={() => setShowCreateTaskModal(true)}>Create Task</Button>
      <Button onClick={() => setShowAddMemberModal(true)}>Add member</Button>
      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
};

export default TeamManagement;
