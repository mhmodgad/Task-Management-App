import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getToken from "../token/getToken";
import saveToken from "../token/saveToken";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
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
    <div className="container-fluid bg-light vh-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-sm-6 col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
