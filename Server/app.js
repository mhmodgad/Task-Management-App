const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

const taskRoutes = require("./routers/taskRouter");
const userRoutes = require("./routers/userRouter");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => console.log(err));

app.use("/task", taskRoutes);

app.use("/user", userRoutes);

const port = process.env.port || 3001;

app.get("/", (req, res) => {
  console.log("request received");
  res.send("Welcome to express");
});

app.get("/home", (req, res) => {
  console.log("request received");
  res.cookie("username", "ali");
  res.cookie("id", 12, { httpOnly: true });
  res.send("Welcome to home");
});

app.listen(port, () => {
  console.log(`listening on port ${port} ......`);
});
