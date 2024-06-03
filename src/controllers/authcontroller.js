const User = require("../models/user");
const bcrypte = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ResetToken = require("../models/ResetToken");
const { ResetPassEmail } = require("../helpers/ResetEmalTemplate");
const { creatRandomBytes } = require("./RandomBytes");
const SibApiV3Sdk = require("../config/brevo");
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

exports.forgotPasswordUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    res
      .status(400)
      .json({ success: false, message: "Please provide a valid email!" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    // Handle the case of user not found he re if needed
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  const token = await ResetToken.findOne({ owner: user._id });
  if (token) {
    // Handle the case where a token already exists
    res.status(400).json({
      success: false,
      message: "Token already exists. Check your email.",
    });
    return;
  }

  const randomBytes = await creatRandomBytes();
  const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
  await resetToken.save();

  const url = `http://localhost:5173/passwordForgot?token=${randomBytes}&id=${user._id}`;

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: { email: "industrie.sym@gmail.com", name: "Sym Industry" },
      subject: "passwordreset",
      htmlContent: ResetPassEmail(url),
      to: [
        {
          email: user.email,
        },
      ],
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  res.json({
    success: true,
    message: "Password reset link is sent to your email.",
  });
};

// resetpassword user
exports.resetpassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return sendError(res, "user not found");
  const isSame = await user.comparePassword(password);
  if (isSame) return sendError(res, "New password Must be different");
  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, "password must be 8 to 20 caracters");
  user.password = password.trim();
  await user.save();
  await ResetToken.findOneAndDelete({ owner: user._id });
  res.status(200).json({
    success: true,
    message: "Password updated",
  });
};
