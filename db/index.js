const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  imageLink: String,
  id:{type: Number, default: 0}
});

const userSignUp = new mongoose.Schema({
  userName: String,
  password: String,
  userTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "tasks" }],
});

const taskModel = mongoose.model("tasks", taskSchema); // taskModel Mongoose model

const userSignUpModel = mongoose.model("userData", userSignUp); // userSignUp Mongoose model

module.exports = { taskModel, userSignUpModel }; // Export the model
