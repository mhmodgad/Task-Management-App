const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("config");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, config.get("jwt"));
    const userId = decodedToken.id;
    const user = await User.find({ userId: userId }).exec();
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    console.log("User authenticated");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
