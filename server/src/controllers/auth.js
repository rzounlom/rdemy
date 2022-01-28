import { comparePassword, hashPassword } from "../utils/auth";

import AWS from "aws-sdk";
import User from "../db/models/user";
import jwt from "jsonwebtoken";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validate data
    if (!name) return res.status(400).send("name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");

    //check if user exists
    const userExsists = await User.findOne({ email });
    if (userExsists) return res.status(400).send("Email is taken");

    //hash password
    const hashedPassword = await hashPassword(password);

    //create new  user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //create cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, //only works on https
    });
    //set user password to undef
    user.password = undefined;

    //return user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error.  Try again");
  }
};

export const login = async (req, res) => {
  console.log("JWT_SECRET", process.env.JWT_SECRET);
  try {
    // console.log("request body: ", req.body);
    //find user with email
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("No user  found");

    //comopare sent password with db password for user
    const match = comparePassword(password, user.password);

    //create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //return user and token to client, exclude password
    if (match) {
      //send token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, //only works on https
      });

      //set user password to undef
      user.password = undefined;

      //return user as json response
      res.json(user);
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error. Try again.");
  }
};

export const logout = async (req, res) => {
  try {
    //delete the cookie
    res.clearCookie("token");
    res.json({ message: "You have successfully signed out" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error. Try Again");
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    // console.log("CURRENT_USER", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const sendTestEmail = async (req, res) => {
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ["firstshiftmedia@gmail.com"],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
            <h1>Reset Password Link</h1>
            <p>Please use the following link to  reset your password</p>
            </html>
            `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Password Reset Link",
      },
    },
  };

  const emailSent = SES.sendEmail(params).promise();

  emailSent
    .then((data) => console.log(data))
    .catch((e) => console.log("error: ", e));
};
