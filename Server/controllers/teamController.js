const Team = require("../models/team");
const User = require("../models/user");
const Task = require("../models/task");

const createTeam = async (req, res) => {
  try {
    const managerId = req.user.id;
    const name = req.body.name;
    const t = await Team.findOne({ name, managerId }).exec();
    console.log(t);
    if (t) {
      return res.status().send("Team already exists");
    }
    const team = new Team({
      managerId: managerId,
      name: name,
      members: [managerId],
    });

    await team.save();
    // Add the team to the manager's list of teams
    await User.findByIdAndUpdate(
      managerId,
      { $addToSet: { teams: team._id } },
      { new: true }
    );
    // console.log("here");
    return res.status(200).send("Team created");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    return res.status(200).send("Team deleted");
  } catch (err) {
    return res.send(500);
  }
};

const getTeams = async (req, res) => {
  try {
    const userId = req.user.id;
    const teams = await Team.find({
      $or: [{ managerId: userId }, { members: userId }],
    })
      .populate({
        path: "managerId",
        select: "name",
      })
      .populate({
        path: "members",
        select: "name",
      })
      .exec();
    console.log(teams);
    return res.status(200).send(teams);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const getTeamById = async (req, res) => {
  try {
    console.log(req.params);
    const teamId = req.params.id;
    const team = await Team.findById({ _id: teamId })
      .populate({
        path: "managerId",
        select: "name",
      })
      .populate({
        path: "members",
        select: "name",
      })
      .exec();
    console.log(team);
    return res.status(200).send(team);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const addMember = async (req, res) => {
  try {
    const username = req.body.username;
    const teamId = req.params.id;
    const user = await User.findOne({ name: username }).exec();
    const team = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: user._id } },
      { new: true }
    )
      .populate({
        path: "members",
      })
      .exec();

    return res.status(200).send(team.members);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const removeMember = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(req.body.userId);
    const teamId = req.params.id;
    const user = await User.findById(userId).exec();
    const team = await Team.findByIdAndUpdate(
      { _id: teamId },
      { $pull: { members: user._id } },
      { new: true }
    )
      .populate({
        path: "members",
      })
      .exec();
    console.log(team.members);
    return res.status(200).send(team.members);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const addTask = async (req, res) => {
  try {
    // const userId = req.body.userId;
    // console.log(req.body.userId);
    const teamId = req.params.id;
    // const user = await User.findById(userId).exec();
    console.log();
    const task = {
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
    };
    console.log(task);
    const team = await Team.findByIdAndUpdate(
      { _id: teamId },
      {
        $push: {
          tasks: req.body.task,
        },
      },
      { new: true }
    )
      .populate({
        path: "tasks",
      })
      .populate({
        path: "members",
      })
      .exec();
    console.log(team.tasks);
    return res.status(200).send(team.tasks);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const removeTask = async (req, res) => {
  try {
    const teamId = req.params.id;
    const taskName = req.params.task;
    const team = await Team.findByIdAndUpdate(
      { _id: teamId },
      { $pull: { tasks: { name: taskName } } },
      { new: true }
    )
      .populate({
        path: "tasks",
      })
      .populate({
        path: "members",
      })
      .exec();
    console.log(team.tasks);
    return res.status(200).send(team.tasks);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  addMember,
  removeMember,
  addTask,
  removeTask,
  deleteTeam,
};
