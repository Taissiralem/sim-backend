const Commandes = require("../models/commandes");
exports.createCommande = async (req, res) => {
  try {
    const { quantity, user, product } = req.body;
    const newCommande = new Commandes({
      quantity,
      user,
      product,
    });

    const savedCommande = await newCommande.save();
    res.status(201).json(savedCommande);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create commande" });
  }
};

exports.getAllCommandes = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Commandes.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const commandes = await Commandes.find()
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
      return res.status(404).json({ error: "commande not found" });
    }
    commande.isValid = !commande.isValid;
    const ress = await commande.save();

    res.status(200).json({ message: "Commande validated successfully" });
  } catch (error) {
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