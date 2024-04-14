import {
  getUser,
  userSignup,
  getTasks,
  createTasks,
  updateTask,
  deleteTask
} from "../controller/index.js";

const router = app => {
  app.get("/users", getUser);
  app.get("/tasks", getTasks);
  app.post("/signUp", validationHandler(userSignConfig), userSignup);
  app.post("/user/createTasks", validationHandler(creteConfig), createTasks);
  app.patch("/update/task/:taskId", updateTask);
  app.delete("/delete/task/:id", deleteTask);
};

export default router;

const creteConfig = [
  {
    name: "taskName",
    dataType: "string",
    required: true,
    from: "body"
  },
  {
    name: "taskDescription",
    dataType: "string",
    required: true,
    from: "body"
  },
  {
    name: "imageLink",
    dataType: "string",
    required: true,
    from: "body"
  }
];

const userSignConfig = [
  {
    name: "userName",
    dataType: "string",
    required: false,
    from: "body"
  },
  {
    name: "password",
    dataType: "string",
    required: true,
    from: "body"
  }
];

// const names = {
//   nikhil: {
//     dob: "02 nov",
//     address: "ug 2"
//   },
//   karan: {
//     dob: "04 aug",
//     address: "Pune"
//   }
// };

// const dynamic = "karan";

// names[dynamic].dob;
// names.karan.address;

const validationHandler = config => (req, res, next) => {
  try {
    for (let i = 0; i < config.length; i++) {
      const value = req[config[i].from][config[i].name];

      if (!value && config[i].required) {
        return res.status(400).send({ message: config[i].name + " missing" });
      }

      if (value && typeof value != config[i].dataType) {
        return res
          .status(400)
          .send({ message: "Invalid type: " + config[i].name });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
