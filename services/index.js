// const models = require("../db/index.js");
// const { app } = require("../index.js");

import models from "../db/index.js";
import {  app } from "../index.js";



console.log(models.userSignUpModel);

// Use Postman to Test
function getUsers() {
  
  app.get("/users", async (req, res) => {
    console.log("inside get");
    const allUsers = await models.userSignUpModel.find({});
    console.log(allUsers, "all signedUp users");
    res.status(201).json(allUsers);
  });
}

app.post("/signUp", async (req, res) => {
  console.log("17", req.body);
  const { userName, password } = req.body;
  const user = await models.userSignUpModel.findOne({ userName });
  try {
    if (user) {
      res.status(403).json({
        message:
          "User already exists, try using a different username for yourself",
      });
    }
    const newUser = new models.userSignUpModel({
      userName,
      password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error saving inquiry" });
  }
});

app.get("/tasks", async (req, res) => {
  console.log("inside get");
  const allUsers = await models.taskModel.find({});
  console.log(allUsers, "all tasks ");
  res.status(201).json(allUsers);
});

app.post("/user/createTasks", async (req, res) => {
  console.log("42", req.body);
  const { taskName, taskDescription, imageLink, id } = req.body;
  const user = await models.userSignUpModel.findOne({
    userName: "karanBhardwajKBJ2",
  });
  let length = user.userTasks.length;
  if (user) {
    try {
      const newTask = new models.taskModel({
        taskName,
        taskDescription,
        imageLink,
        id: length + 1,
      });
      user.userTasks.push(newTask);
      await user.save();
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Error saving Task" });
    }
  } else {
    res.status(201).json({ message: "the user doesnt exist " });
  }
});

app.patch("/update/task/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  console.log(taskId, "taskID");
  const todoTask = await models.taskModel.findOneAndUpdate(
    { _id: taskId },
    req.body,
    { new: true }
  );
  if (todoTask) {
    res.json({ message: "task updated successfully" });
  } else {
    res.status(404).json({ message: "task not found" });
  }
});

app.delete("/delete/task", async (req, res) => {
  const user = await models.userSignUpModel
    .findOne({
      userName: "karanBhardwajKBJ2",
    })
    .populate("userTasks");
  //   console.log(user);

  const taskToDeleteId = user.userTasks[0]._id;
  await user.userTasks.pull(taskToDeleteId);
  await user.save();
  console.log(user);
});

export default getUsers;