const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const reqLogger = require("./middlewares/req");
const userId = require("./middlewares/userId");
app.use(bodyParser.json());

const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

const taskRoutes = require("./routers/taskRouter");
const userRoutes = require("./routers/userRouter");
const teamRoutes = require("./routers/teamRouter");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(reqLogger);

app.use("/task", taskRoutes);

app.use("/user", userRoutes);

app.use("/team", teamRoutes);

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port} ......`);
});
