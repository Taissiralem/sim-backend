const { isValidObjectId } = require("mongoose");
const ResetToken = require("../models/ResetToken");
const User = require("../models/user");

exports.isResetTokenValidUser = async (req, res, next) => {
  const { token, id } = req.query;

  if (!token || !id) {
    // Handle invalid request error
    return res.status(400).json({ error: "Invalid Request!" });
  }

  if (!isValidObjectId(id)) {
    // Handle invalid user ID error
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = await User.findById(id);

  if (!user) {
    // Handle user not found error
    return res.status(404).json({ error: "User not found!" });
  }

  const resetToken = await ResetToken.findOne({ owner: user._id });

  if (!resetToken) {
    // Handle token not found error
    return res.status(404).json({ error: "Token not found" });
  }

  const isValid = await resetToken.compareToken(token);

  if (!isValid) {
    // Handle invalid token error
    return res.status(400).json({ error: "Reset token is not valid!" });
  }

  req.user = user;
  next();
};
