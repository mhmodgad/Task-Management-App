const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("config");

const getUserId = async (req, res, next) => {
  try {
    console.log(req.header);
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, config.get("jwt"));
    const userId = decodedToken.id;
    // console.log(userId);
    const user = await User.findById(userId).exec(); // .find({ userId: userId }).exec();
    // console.log(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    console.log("User Has valid token");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please Login first." });
  }
};

module.exports = getUserId;
