import { getUser } from "../controller/index.js";

const router = app => {
  app.get("/get", getUser);
};

export default router;
