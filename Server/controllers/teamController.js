const Team = require("../models/team");
const User = require("../models/user");
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
    const team = await Team.findById({_id: teamId})
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

module.exports = { createTeam, getTeams, getTeamById };
