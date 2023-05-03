const Team = require("../models/team");

const auth = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId).exec(); // .find({ userId: userId }).exec();
    if (!team) {
      throw new Error();
    }
    if (team.managerId.toString() === req.user.id) {
      console.log("auth");
      next();
    } else {
      console.log("not auth");
      return res.status(401).send({ erro: "You are not authenticated" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please Login first." });
  }
};

module.exports = auth;
