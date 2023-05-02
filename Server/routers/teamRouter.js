const {
  createTeam,
  getTeams,
  getTeamById,
} = require("../controllers/teamController");
const express = require("express");
const router = express.Router();

// router.get("/", )
router.post("/", createTeam);
router.get("/:id", getTeamById);
router.get("/", getTeams);

module.exports = router;
