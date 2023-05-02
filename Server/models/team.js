const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// To make sure that each member is in unique team locally
teamSchema.index({ name: 1, members: 1 }, { unique: true });
teamSchema.index({ name: 1, managerId: 1 }, { unique: true });
module.exports = mongoose.model("Team", teamSchema);
