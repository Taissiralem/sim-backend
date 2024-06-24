const Category = require("../models/category");
const Famille = require("../models/famille");
const Type = require("../models/type");

exports.createFamille = async (req, res) => {
  try {
    const { titlefr, titleen } = req.body;
    const famille = new Famille({ titlefr, titleen });
    await famille.save();
    res.status(201).json(famille);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { titlefr, titleen, familleId } = req.body;
    const image = req.image;
    const category = new Category({
      titlefr,
      titleen,
      famille: familleId,
      image,
    });
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
    const { titlefr, titleen, categoryId } = req.body;
    const type = new Type({ titlefr, titleen, category: categoryId });
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
    let query = Famille.find().populate("categories");
    let totalCountPromise = Famille.countDocuments();

    if (req.query.pagination && req.query.pagination.toLowerCase() === "true") {
      const totalCount = await totalCountPromise;
      const totalPages = Math.ceil(totalCount / pageSize);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
      const familles = await query;
      res.status(200).json({ familles, totalPages });
    } else {
      const familles = await query;
      res.status(200).json({ familles });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFamilleById = async (req, res) => {
  try {
    const { famillId } = req.params;
    const famille = await Famille.findById(famillId).populate("categories");

    if (!famille) {
      return res.status(404).json({ error: "Famille not found" });
    }

    res.status(200).json(famille);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get categori by id
exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate("types");
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    let query = Category.find()
      .populate("famille", "titlefr")
      .populate("types");
    let totalCountPromise = Category.countDocuments();

    if (req.query.pagination && req.query.pagination.toLowerCase() === "true") {
      const totalCount = await totalCountPromise;
      const totalPages = Math.ceil(totalCount / pageSize);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
      const categories = await query;
      res.status(200).json({ categories, totalPages });
    } else {
      const categories = await query;
      res.status(200).json({ categories });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    let query = Type.find().populate("category");
    let totalCountPromise = Type.countDocuments();

    if (req.query.pagination && req.query.pagination.toLowerCase() === "true") {
      const totalCount = await totalCountPromise;
      const totalPages = Math.ceil(totalCount / pageSize);
      query = query.skip((page - 1) * pageSize).limit(pageSize);
      const types = await query;
      res.status(200).json({ types, totalPages });
    } else {
      const types = await query;
      res.status(200).json({ types });
    }
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
