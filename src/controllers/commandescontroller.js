const Counter = require("../models/Counter.js");
const Commandes = require("../models/commandes.js");
const User = require("../models/user.js");
exports.createCommande = async (req, res) => {
  try {
    const { quantity, user, product, client, phoneNumber, totalPrice } =
      req.body;

    const numCommande = await Counter.findOneAndUpdate(
      { name: "Commandes" },
      { $inc: { count: 1 } },
      { new: true }
    );
    const today = new Date();

    const newCommande = new Commandes({
      quantity,
      user,
      product,
      client,
      phoneNumber,
      totalPrice,
      num: `${String(today.getMonth() + 1).padStart(2, "0")}${String(
        today.getYear() - 100
      ).padStart(2, "0")}${String(numCommande?.count).padStart(4, "0")}`,
    });
    const savedCommande = await newCommande.save();
    if (user) {
      const foundUser = await User.findById(user);
      if (foundUser) {
        foundUser.commandes.push(savedCommande._id);
        await foundUser.save();
      }
    }
    res.status(201).json(savedCommande);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create commande" });
  }
};
exports.getAllCommandes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    let filter = {};

    if (
      req.query.isValid !== undefined &&
      req.query.isValid !== "" &&
      req.query.isValid !== "all"
    ) {
      filter.isValid = req.query.isValid === "true";
    }
    const totalCount = await Commandes.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / pageSize);
    const commandes = await Commandes.find(filter)
      .populate("user")
      .populate("product")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({ commandes, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch commandes" });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const commandes = await Commandes.findById(id)
      .populate("user")
      .populate("product");
    if (!commandes) {
      return res.status(404).json({ error: "Commandes not found" });
    }
    res.status(200).json(commandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch commmandes" });
  }
};

exports.deleteCommandeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCommande = await Commandes.findByIdAndDelete(id);
    if (!deletedCommande) {
      return res.status(404).json({ error: "Commande not found" });
    }
    res.status(200).json({ message: "Commande deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Commande" });
  }
};

exports.countCommandes = async (req, res) => {
  try {
    const CommandesCount = await Commandes.countDocuments();
    res.json({ count: CommandesCount });
  } catch (err) {
    console.error("Error counting orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.ValidateCommandes = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commandes.findById(id);
    if (!commande) {
      return res.status(404).json({ error: "Commande not found" });
    }
    commande.isValid = !commande.isValid;
    if (commande.isValid) {
      const user = commande.user;
      if (user) {
        const foundUser = await User.findById(user);
        if (foundUser) {
          const pointsToAdd = commande.totalPrice / 10000;
          foundUser.level.points += pointsToAdd;

          if (foundUser.level.points >= 1000) {
            foundUser.level.name = "diamond";
          } else if (foundUser.level.points >= 200) {
            foundUser.level.name = "gold";
          } else if (foundUser.level.points >= 10) {
            foundUser.level.name = "silver";
          } else {
            foundUser.level.name = "bronze";
          }
          await foundUser.save();
        }
      }
    } else {
      const user = commande.user;
      if (user) {
        const foundUser = await User.findById(user);
        if (foundUser) {
          const pointsToAdd = commande.totalPrice / 10000;
          foundUser.level.points -= pointsToAdd;

          if (foundUser.level.points >= 1000) {
            foundUser.level.name = "diamond";
          } else if (foundUser.level.points >= 100) {
            foundUser.level.name = "gold";
          } else if (foundUser.level.points >= 10) {
            foundUser.level.name = "silver";
          } else {
            foundUser.level.name = "bronze";
          }
          await foundUser.save();
        }
      }
    }
    await commande.save();
    res.status(200).json({ message: "Commande validated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
exports.ValidatedCommandesCount = async (req, res) => {
  try {
    const CommandesCount = await Commandes.countDocuments({ isValid: true });
    res.json({ count: CommandesCount });
  } catch (err) {
    console.error("Error counting orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.PendigCommandesCount = async (req, res) => {
  try {
    const CommandesCount = await Commandes.countDocuments({ isValid: false });
    res.json({ count: CommandesCount });
  } catch (err) {
    console.error("Error counting orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrdersByFamily = async (req, res) => {
  try {
    const ordersByFamily = await Commandes.aggregate([
      {
        $lookup: {
          from: "products", 
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.famille",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ ordersByFamily });
  } catch (error) {
    console.error("Error fetching orders by family:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
