const User = require("../models/user.js");

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, email } = req.body;
    if (req.authuser.id !== id && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find the user by ID and update their data
    const user = await User.findByIdAndUpdate(
      id,
      { FirstName, LastName, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).json({ users, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.authuser.id !== id && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.countUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ count: userCount });
  } catch (err) {
    console.error("Error counting users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserCommandes = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.authuser.id !== userId && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId).populate({
      path: "commandes",
      populate: {
        path: "product",
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.commandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user commandes" });
  }
};
exports.getUserLevel = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.authuser.id !== userId && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      level: user.level,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user level information" });
  }
};

exports.updateUserTour = async (req, res) => {
  const { userId } = req.params;
  try {
    if (req.authuser.id !== userId && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    user.tour = true;
    await user.save();
    return res.status(200).json({ message: "user tour updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all user levels
exports.getAllUserLevels = async (req, res) => {
  try {
    const users = await User.find({}, "level");
    const levels = users.map((user) => user.level);
    res.status(200).json({ levels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
