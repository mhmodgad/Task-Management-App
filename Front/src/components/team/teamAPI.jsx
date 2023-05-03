import axios from "axios";
import getToken from "../../token/getToken";

export const handleAddMember = async (
  id,
  newMember,
  memberSuggestions,
  setMembers,
  setShowAddMemberModal,
  setNewMember,
  getToken,
  setError
) => {
  try {
    console.log(memberSuggestions);
    console.log(memberSuggestions.includes(newMember));
    if (!memberSuggestions.includes(newMember)) {
      alert("User doesn't exist");
      return;
    } else {
      const response = await axios.post(
        `http://localhost:3001/team/${id}/members`,
        {
          username: newMember,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log(response);
      setMembers(response.data);
      setShowAddMemberModal(false);
      setNewMember("");
    }
  } catch (err) {
    setError(err.response.data.message);
  }
};

// Handle form submit to remove a task from the team
export const handleRemoveTask = async (
  id,
  selectedTask,
  setTasks,
  setShowRemoveTaskModal,
  setError
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/team/${id}/tasks/${selectedTask.name}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    setTasks(response.data);
    setShowRemoveTaskModal(false);
  } catch (err) {
    setError(err.response.data.message);
  }
};

// Handle form submit to remove a member from the team
export const handleRemoveMember = async (
  e,
  id,
  newMember,
  setMembers,
  setShowRemoveMemberModal,
  setNewMember,
  getToken,
  setError
) => {
  e.preventDefault();
  try {
    const response = await axios.delete(
      `http://localhost:3001/team/${id}/members`,
      {
        data: { userId: newMember },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    setMembers(response.data);
    setShowRemoveMemberModal(false);
    setNewMember("");
  } catch (err) {
    setError(err.response.data.message);
  }
};

// Handle form submit to create a new task
export const handleCreateTask = async (
  e,
  id,
  newTask,
  setTasks,
  setShowCreateTaskModal,
  setNewTask,
  setError,
  getToken
) => {
  e.preventDefault();
  console.log(newTask);
  try {
    const response = await axios.post(
      `http://localhost:3001/team/${id}/tasks`,
      {
        task: newTask,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(response.data);
    setTasks(response.data);
    setShowCreateTaskModal(false);
    setNewTask({ name: "", description: "", dueDate: "" });
  } catch (err) {
    setError(err.response.data.message);
  }
};

export const handleAssignTask = async (
  e,
  id,
  selectedTask,
  assignee,
  setTasks,
  setShowAssignTaskModal,
  setAssignee,
  setError
) => {
  e.preventDefault();
  try {
    const response = await axios.put(
      `http://localhost:3001/team/${id}/tasks/${selectedTask._id}/assign`,
      { assignee },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    setTasks(response.data.tasks);
    setShowAssignTaskModal(false);
    setAssignee("");
  } catch (err) {
    setError(err.response.data.message);
  }
};
