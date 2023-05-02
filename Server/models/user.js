const mongoose = require("mongoose");
const valid = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => {
        return valid.isEmail(v);
      },
      message: "{VALUE} is not valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  teams: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
