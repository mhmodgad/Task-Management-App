import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import getToken from "../../token/getToken";
import { Link } from "react-router-dom";
// import { Card, Button } from 'react-bootstrap';

const ListTeams = () => {
  const [teams, setTeams] = useState([]);
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
  const [teamId, setTeamId] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/team", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        console.log(response.data);
        setTeams(response.data);
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.response.status}`);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTeamSubmit = async () => {
    console.log("here");
    await axios
      .delete(`http://localhost:3001/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        responseType: "json",
      })
      .then((response) => {
        // console.log("dss");
        // console.log(response.data);
        setTeams(teams.filter((team) => team._id !== teamId));
        console.log(teams);
        setShowDeleteTeamModal(false);
        setTeamId("");
      })
      .catch((error) => {
        console.log(error);
        alert(`Error: ${error.response.status}`);
      });
    console.log("here");
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Teams</h1>
        <Button variant="primary" as={Link} to="/newTeam">
          Create Team
        </Button>
      </div>
      {teams.map((team) => (
        <Card key={team._id} className="mb-3">
          <Card.Header>{team.name}</Card.Header>
          <Card.Body>
            <Card.Title>Manager: {team.managerId.name}</Card.Title>
            <Card.Text>
              Members: {team.members.map((member) => member.name).join(", ")}
            </Card.Text>
            <Link to={`/team/${team._id}`}>
              <Button variant="primary">View Team</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                setShowDeleteTeamModal(true);
                setTeamId(team._id);
              }}
            >
              Remove
            </Button>
          </Card.Body>
        </Card>
      ))}
      <Modal
        show={showDeleteTeamModal}
        onHide={() => setShowDeleteTeamModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove the Team "?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteTeamModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTeamSubmit}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ListTeams;
