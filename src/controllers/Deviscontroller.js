const Devis = require("../models/Devis.js");
exports.createDevis = async (req, res) => {
  try {
    const { name, email, phoneNumber, message, product, user } = req.body;

    const newDevis = new Devis({
      name,
      email,
      phoneNumber,
      message,
      product,
      user,
    });

    const savedDevis = await newDevis.save();
    res.status(201).json(savedDevis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create devis" });
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

exports.deleteDevis = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndDelete(req.params.id);
    res.status(200).json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete devis" });
  }
};

exports.getDevisCount = async (req, res) => {
  try {
    const totalCount = await Devis.countDocuments();
    res.status(200).json({ totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch devis count" });
  }
};

exports.addFiletoDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.image;
    const devis = await Devis.findById(id);
    if (!devis) {
      return res.status(404).json({ error: "Devis not found" });
    }

    if (image) {
      devis.file = image; // Adjust path based on storage settings
      await devis.save();
      res.status(200).json({
        message: "File uploaded successfully",
        file: devis.file,
        devis,
      });
    } else {
      res.status(400).json({ error: "No file provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
exports.removeFileFromDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findById(id);
    if (!devis) {
      return res.status(404).json({ error: "Devis not found" });
    }

    if (devis.file) {
      devis.file = undefined;
      devis.isValid = false;
      await devis.save();
      res.status(200).json({
        message: "File removed successfully",
        devis,
      });
    } else {
      res.status(400).json({ error: "No file to remove" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findById(id);
    if (!devis) {
      return res.status(404).json({ error: "Devis not found" });
    }

    devis.isValid = req.body.isValid;
    await devis.save();
    res.status(200).json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
