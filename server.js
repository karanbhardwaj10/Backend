import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { getUser } from "./services/index.js";

const port = 5000;

const server = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  async function main() {
    await mongoose.connect(
      "mongodb+srv://karanbhardwaj7917:K%40ran@cluster0.tnyotml.mongodb.net/toDoApp",
      { dbName: "toDoApp" }
    );
  }

  app.get("/get", getUser);

  main().catch(err => console.log(err));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default server;
