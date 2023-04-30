const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const config = require("config");

// Sort tasks by nearest deadline
const tasksByNearestDeadline = (tasks) =>
  tasks.sort((a, b) => {
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

const priorityValues = {
  low: 0,
  midium: 1,
  high: 2,
};

// Sort tasks by priority
const tasksByPriority = (tasks) =>
  tasks.sort((a, b) => {
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

const getAllTasks = async (req, res) => {
  try {
    console.log("Get all tasks");
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.get("jwt"));
    const userId = decodedToken.id;
    // console.log(userId); // prints the user ID extracted from the token
    let tasks = await Task.find({ userId: userId }).exec();
    const sortBy = req.query.sortBy;

    if (sortBy === "priority") {
      tasks = tasksByPriority(tasks);
    } else {
      tasks = tasksByNearestDeadline(tasks);
    }
  
    // console.log(tasks);
    return res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const createTask = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.get("jwt"));
    const userId = decodedToken.id;
    console.log(userId); // prints the user ID extracted from the token
    let task = Task({
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
    });
    await task.save();
    return res.status(200);
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(500);
  }
};

const getTaskById = (req, res) => {
  // Logic for getting a single task by ID
};

const updateTask = (req, res) => {
  // Logic for updating a task
};

const deleteTask = async (req, res) => {
  try {
    console.log("delete task");
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).send();
    }

    res.send(deletedTask);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
