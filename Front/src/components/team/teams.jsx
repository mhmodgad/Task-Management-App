import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import getToken from "../../token/getToken";
import { Link } from "react-router-dom";
// import { Card, Button } from 'react-bootstrap';

const ListTeams = () => {
  const [teams, setTeams] = useState([]);

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
          </Card.Body>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListTeams;
