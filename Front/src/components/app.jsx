import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import NotFound from "./notfound";
import Register from "./register";
import TaskList from "./tasks";
import CreateTask from "./tasks-create";
class app extends Component {
  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/tasks" exact element={<TaskList />} />
          <Route path="/create" exact element={<CreateTask />} />
          <Route path="/not" element={<NotFound />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/not" replace />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default app;
