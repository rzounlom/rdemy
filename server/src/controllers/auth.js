import { comparePassword, hashPassword } from "../utils/auth";

import User from "../db/models/user";

export const register = async (req, res) => {
  try {
    console.log(req.body);
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

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error.  Try again");
  }
};
