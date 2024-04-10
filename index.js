const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
app.use(cors());
app.use(bodyParser.json()); 
async function main() {
  await mongoose.connect(
    "mongodb+srv://karanbhardwaj7917:K%40ran@cluster0.tnyotml.mongodb.net/toDoApp",
    { dbName: "toDoApp" }
  );
}

main().catch((err) => console.log(err));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app ;

// module.exports = { express, cors, bodyParser, axios, mongoose, app, port };

