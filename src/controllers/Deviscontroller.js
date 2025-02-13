const Devis = require("../models/Devis.js");
exports.createDevis = async (req, res) => {
  try {
    const { name, email, phoneNumber, message, product } = req.body;

    const newDevis = new Devis({
      name,
      email,
      phoneNumber,
      message,
      product,
    });

    const savedDevis = await newDevis.save();
    res.status(201).json(savedDevis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create commande" });
  }
};

exports.getDevis = async (req, res) => {
  try {
    const devis = await Devis.find();
    res.status(200).json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get devis" });
  }
};

exports.getDevisById = async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    res.status(200).json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get devis" });
  }
};

exports.updateDevis = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, {
      isValid: !req.body.isValid,
    });
    res.status(200).json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update devis" });
  }
};

exports.deleteDevis = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndDelete(req.params.id);
    res.status(200).json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete devis" });
  }
};
