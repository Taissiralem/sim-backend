const User = require("../models/user.js");
const Commandes = require("../models/commandes.js");
const Devis = require("../models/Devis.js");
const SibApiV3Sdk = require("../config/brevo.js");
const { ConfirmAccountEmail } = require("../helpers/AttributedAccount.js");
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

    // Vérification de l'autorisation
    if (req.authuser.id !== userId && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const commandes = await Commandes.find({ user: userId }).populate({
      path: "products.product",
      model: "Product", 
    });

    res.status(200).json(commandes);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commandes de l'utilisateur:",
      error
    );
    res.status(500).json({ error: "Failed to retrieve user commandes" });
  }
};
exports.getUserDevis = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Vérification de l'autorisation
    if (req.authuser.id !== userId && req.authuser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Récupérer les commandes de l'utilisateur avec la relation correcte
    const devis = await Devis.find({ user: userId });

    res.status(200).json(devis);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commandes de l'utilisateur:",
      error
    );
    res.status(500).json({ error: "Failed to retrieve user devis", error });
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

exports.attributeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, entreprise, RC, adresse } = req.body;

    if (!type || !RC || !adresse) {
      return res
        .status(400)
        .json({ error: "Type, RC and adresse are required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.pendingType = type;
    user.pendingEntreprise = entreprise;
    user.pendingRC = RC;
    user.pendingAdresse = adresse;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Attribution request sent successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateAttribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { validate } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.pendingType) {
      return res.status(400).json({ error: "No pending attribution request" });
    }

    if (validate) {
      user.type = user.pendingType;
      user.entreprise = user.pendingEntreprise;
      user.RC = user.pendingRC;
      user.adresse = user.pendingAdresse;

      user.pendingType = null;
      user.pendingEntreprise = null;
      user.pendingAdresse = null;
      user.pendingRC = null;
    } else {
      user.pendingType = null;
      user.pendingEntreprise = null;
      user.pendingAdresse = null;
      user.pendingRC = null;
    }
    try {
      await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        sender: { email: "industrie.sym@gmail.com", name: "Sym Industry" },
        subject: "Compte Validé",
        htmlContent: ConfirmAccountEmail(user.type),
        to: [{ email: user.email }],
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Attribution request processed successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

// get all users with pending type
exports.getAllUsersWithPendingType = async (req, res) => {
  try {
    const users = await User.find({
      pendingType: { $exists: true, $ne: null },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCodeClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const existingUser = await User.findOne({ code });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Code is already assigned to another user" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.code = code;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
