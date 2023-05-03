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
  tasks: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      assignee: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          validate: {
            validator: function (v) {
              return this.members.includes(v);
            },
            message: (props) => `${props.value} is not a member of this team`,
          },
        },
      ],
      dueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

// To make sure that each member is in unique team locally
teamSchema.index({ name: 1, members: 1 }, { unique: true });
teamSchema.index({ name: 1, managerId: 1 }, { unique: true });
teamSchema.index(
  { name: 1, "tasks.name": 1 },
  { unique: true, partialFilterExpression: { "tasks.name": { $exists: true } } }
);
module.exports = mongoose.model("Team", teamSchema);
