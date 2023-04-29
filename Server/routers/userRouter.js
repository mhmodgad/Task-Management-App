const express = require("express");
const router = express.Router();
const user = require("../models/user");

// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({
//     extended: true
// }));
// router.use(bodyParser.json());

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
router.delete("/:id", deleteUser);

module.exports = router;
