import { getUser , userSignup, getTasks,createTasks, updateTask,deleteTask} from "../controller/index.js";

const router = app => {
  app.get("/users", getUser);
  app.get("/tasks", getTasks);
  app.post("/signUp", userSignup);
  app.post("/user/createTasks", createTasks);
  app.patch("/update/task/:taskId", updateTask);
  app.delete("/delete/task", deleteTask);

};

export default router;
