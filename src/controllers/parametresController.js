const Category = require("../models/category");
const Famille = require("../models/famille");
const Type = require("../models/type");

exports.createFamille = async (req, res) => {
  try {
    const { title } = req.body;
    const famille = new Famille({ title });
    await famille.save();
    res.status(201).json(famille);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { title, familleId } = req.body;
    const category = new Category({ title, famille: familleId });
    await category.save();

    await Famille.findByIdAndUpdate(familleId, {
      $push: { categories: category._id },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createType = async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const type = new Type({ title, category: categoryId });
    await type.save();

    await Category.findByIdAndUpdate(categoryId, {
      $push: { types: type._id },
    });

    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFamilles = async (req, res) => {
  try {
    const familles = await Famille.find().populate("categories");
    res.status(200).json(familles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("types");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.find().populate("category");
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
