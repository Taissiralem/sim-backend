const Gamme = require("../models/gamme");
const Marque = require("../models/marque");
const Category = require("../models/category");

// Controller function to create a new Marque
exports.createMarque = async (req, res) => {
  try {
    const { title, gammes } = req.body;
    const newMarque = new Marque({
      title,
      gammes,
    });

    const savedMarque = await newMarque.save();
    res.status(201).json(savedMarque);
  } catch (error) {
    res.status(500).json({ error: "Failed to create marque" });
  }
};

// Controller function to create a new Gamme and update the referenced Marque
exports.createGamme = async (req, res) => {
  try {
    const { title, marque, categories } = req.body;
    const newGamme = new Gamme({
      title,
      marque,
      categories,
    });

    const savedGamme = await newGamme.save();
    await Marque.findByIdAndUpdate(
      marque,
      { $push: { gammes: savedGamme._id } },
      { new: true }
    );

    res.status(201).json(savedGamme);
  } catch (error) {
    res.status(500).json({ error: "Failed to create gamme" });
  }
};

// Controller function to create a new Category and update the referenced Gamme
exports.createCategory = async (req, res) => {
  try {
    const { title, gamme } = req.body;
    const newCategory = new Category({
      title,
      gamme,
    });

    const savedCategory = await newCategory.save();

    await Gamme.findByIdAndUpdate(
      gamme,
      { $push: { categories: savedCategory._id } },
      { new: true }
    );

    res.status(201).json(savedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

exports.getAllMarque = async (req, res) => {
  try {
    const marques = await Marque.find().populate("gammes");
    res.status(200).json(marques);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch marques" });
  }
};

exports.getAllGamme = async (req, res) => {
  try {
    const gammes = await Gamme.find().populate("categories").populate("marque");
    res.status(200).json(gammes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gammes" });
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().populate("gamme");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
