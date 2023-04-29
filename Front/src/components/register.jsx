import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./css/Register.css";
import axios from "axios";
import { useEffect } from "react";
import getToken from "../token/getToken";
import saveToken from "../token/saveToken";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/register", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        saveToken(response.data);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      alert("Error Registering");
    }
  };

  useEffect(() => {
    if (getToken() !== null) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="register-container">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>

              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
