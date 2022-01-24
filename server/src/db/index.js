require("dotenv").config();

import mongoose from "mongoose";

export const db = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connected"))
    .catch((err) => console.log("DB connected", err));
