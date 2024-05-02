const User = require("../models/user");
const bcrypte = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login instead." });
  }
  const hashedPassword = bcrypte.hashSync(password);
  const user = new User({
    FirstName,
    LastName,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    return res
      .status(201)
      .json({ message: "Successfully Signed Up and Logged In", user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error during signup" });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypte.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "invalid Email / password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3h",
  });

  return res.status(200).json({
    message: "Successfully Logged In",
    user: existingUser,
    token,
  });
};
