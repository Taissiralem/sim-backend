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
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Famille.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const familles = await Famille.find()
      .populate("categories")
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({ familles, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Category.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const categories = await Category.find()
      .populate("types")
      .populate("famille")
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({ categories, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Type.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const types = await Type.find()
      .populate("category")
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({ types, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await Type.findByIdAndDelete(id);
    if (!type) {
      return res.status(404).json({ error: "Type not found" });
    }
    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteFamille = async (req, res) => {
  try {
    const { id } = req.params;
    const famille = await Famille.findByIdAndDelete(id);
    if (!famille) {
      return res.status(404).json({ error: "Famille not found" });
    }
    res.status(200).json({ message: "Famille deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.countFamilles = async (req, res) => {
  try {
    const count = await Famille.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.countTypes = async (req, res) => {
  try {
    const count = await Type.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.countCategories = async (req, res) => {
  try {
    const count = await Category.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
