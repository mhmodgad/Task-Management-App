const User = require("../models/user");

const getAllUsers = (req, res) => {
  // Logic for getting all tasks
};

const register = async (req, res, nxt) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(409).send("Email already exists");
    }
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      password: hashed,
      name: req.body.name,
    });
    await user.save();
    const token = JWT.sign({ id: user.id }, config.get("jwt"));
    return res.status(200).send(token);
  } catch (err) {
    nxt(err);
  }
};

// login
const login = async (req, res, nxt) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(409).send("User Doesn't Exist");
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        console.log("Error comparing passwords");
      }
      if (result) {
        const token = JWT.sign({ id: user.id }, config.get("jwt"));
        return res.status(200).send(token);
      } else {
        return res.status(403).send("Wrong passwords");
      }
    });
  } catch (err) {
    console.log(err);
    nxt(err);
  }
};

const updateUser = (req, res) => {
  // Logic for updating a task
};

const deleteUser = (req, res) => {
  // Logic for deleting a task
};

const searchByUsername = async (req, res) => {
  try {
    console.log(req.query.q);
    const searchQuery = req.query.q;
    const users = await User.find({ name: { $regex: `^${searchQuery}` } });
    const names = users.map((user) => user.name);
    return res.status(200).send(names);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  updateUser,
  deleteUser,
  searchByUsername,
};
