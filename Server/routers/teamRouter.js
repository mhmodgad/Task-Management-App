const {
  createTeam,
  getTeams,
  getTeamById,
  addMember,
  removeMember,
  addTask,
  removeTask,
  deleteTeam,
} = require("../controllers/teamController");

const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.post("/", createTeam);
router.delete("/:id", auth, deleteTeam);
router.get("/:id", getTeamById);
router.get("/", getTeams);
router.post("/:id/members", addMember);
router.delete("/:id/members", removeMember);
router.post("/:id/tasks", addTask);
router.delete("/:id/tasks/:task", removeTask);
module.exports = router;
