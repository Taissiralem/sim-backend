const User = require("../models/user");
const bcrypte = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ResetToken = require("../models/ResetToken.js");
const { ResetPassEmail } = require("../helpers/ResetEmalTemplate.js");
const { creatRandomBytes } = require("./RandomBytes.js");
const SibApiV3Sdk = require("../config/brevo.js");
exports.signup = async (req, res) => {
  const { FirstName, LastName, email, password, phoneNumber } = req.body;

  try {
    // Check if email or phone number is already in use
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number already exists! Login instead.",
      });
    }

    // Hash the password
    const hashedPassword = bcrypte.hashSync(password, 10);

    // Create new user
    const user = new User({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("token", token, {
      sameSite: "Lax",
      maxAge: 31536000000, // 1 year
    });

    return res.status(201).json({
      message: "Successfully Signed Up and Logged In",
      user,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Error during signup" });
  }
};

exports.signin = async (req, res) => {
  const { identifier, password } = req.body; // Accept either email or phone

  try {
    // Check if identifier is an email or phone number
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const query = isEmail ? { email: identifier } : { phoneNumber: identifier };

    // Find user by email or phone
    const existingUser = await User.findOne(query);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up." });
    }

    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid email/phone or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("token", token, {
      sameSite: "Lax",
      maxAge: 31536000000, // 1 year
    });

    return res.status(200).json({
      message: "Successfully Logged In",
      user: existingUser,
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotPasswordUser = async (req, res) => {
  const { email } = req.body;

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

  const randomBytes = await creatRandomBytes();
  const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
  await resetToken.save();

  const url = `https://symindustrie.com/passwordReset?token=${randomBytes}&id=${user._id}`;

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
    .catch(async (error) => {
      await resetToken.deleteOne();
      console.error(error);
    });

  res.json({
    success: true,
    message: "Password reset link is sent to your email.",
  });
};

exports.resetpassword = async (req, res) => {
  try {
    const { password } = req.body;

    // Find user by ID
    const user = await User.findById(req.user._id);

    // Check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if the new password is the same as the old password
    const isSame = await user.comparePassword(password);
    if (isSame) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the old password",
      });
    }

    // Hash the new password
    const hashedPassword = bcrypte.hashSync(password.trim(), 10);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    // Delete any existing reset tokens for the user
    await ResetToken.findOneAndDelete({ owner: user._id });

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
