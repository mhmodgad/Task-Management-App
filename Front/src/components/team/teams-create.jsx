import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import getToken from "../../token/getToken";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { name, description } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/team",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          name: "",
          description: "",
        });
        navigate("/teams", { replace: true });
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
        <Col>
          <h1>Create a New Team</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTeamName">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTeamDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={description}
                onChange={handleChange}
              />
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

export default CreateTeam;
