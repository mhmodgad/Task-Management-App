const express = require("express");
const router = express.Router();
const auth = require("../middlewares/userId");

const {
  getAllUsers,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
