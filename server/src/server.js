import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import { db } from "./db";
import express from "express";
import { readdirSync } from "fs";
const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

//create express app
const app = express();

//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(csrfProtection);

//route
readdirSync("./src/routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//port
const PORT = process.env.PORT || 5000;

//connect to db
db();

//start server
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
