import cors from "cors";
import { db } from "./db";
import express from "express";
import { readdirSync } from "fs";
const morgan = require("morgan");
require("dotenv").config();

//create express app
const app = express();

//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
readdirSync("./src/routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

//port
const PORT = process.env.PORT || 5000;

//connect to db
db();

//start server
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
