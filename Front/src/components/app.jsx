import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import NotFound from "./notfound";
import Register from "./register";
import TaskList from "./task/tasks";
import CreateTask from "./task/tasks-create";
import TeamsList from "./team/teams";
import CreateTeam from "./team/teams-create";
import Navigation from "./navbar";
import TeamManagement from "./team/team-manage";
class app extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/tasks" exact element={<TaskList />} />
          <Route path="/task/:id" exact element={<CreateTask />} />
          <Route path="/teams" exact element={<TeamsList />} />
          <Route path="/newTeam" exact element={<CreateTeam />} />
          <Route path="/team/:id" exact element={<TeamManagement />} />
          <Route path="/not" element={<NotFound />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/not" replace />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default app;
