const { default: mongoose } = require("mongoose");
const Product = require("../models/product.js");
const { deleteImage } = require("../helpers/cloudinaryUtils.js");

exports.createProduct = async (req, res) => {
  try {
    const {
      titlefr,
      titleen,
      price,
      description,
      famille,
      category,
      type,
      marque,
      gamme,
    } = req.body;
    const images = req.imageURLs;
    const newProduct = new Product({
      titlefr,
      titleen,
      price,
      description,
      famille,
      category,
      type,
      marque,
      gamme,
      images,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};
exports.updateProductById = async (req, res) => {
  // console.log(req.body);
  try {
    if (req.body.images) {
      console.log("req.body.images: ", typeof req.body.images);
      if (!Array.isArray(req.body.images)) {
        req.body.images = [req.body.images];
      }
    } else {
      req.body.images = [];
    }
    const { id } = req.params;
    const updatedData = req.imageURLs || [];
    const final_images = [...req.body.images, ...updatedData];
    // console.log(...(req.body.images));
    // console.log(req.imageURLs);
    const updatedProduct = await Product.findById(id);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    updatedProduct.images = final_images;
    await updatedProduct.save();
    await updatedProduct.updateOne({
      $set: {
        ...req.body,
        images: final_images,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const { famille, category, type } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    let filter = {};
    if (famille && famille !== "" && famille !== "all") {
      filter.famille = famille;
    }
    if (category && category !== "" && category !== "all") {
      filter.category = category;
    }
    if (type && type !== "" && type !== "all") {
      filter.type = type;
    }
    const products = await Product.find(filter)
      .populate("famille", "titlefr titleen")
      .populate("category", "titlefr titleen")
      .populate("type", "titlefr titleen")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select(
        "titleen titlefr price description images famille category type marque gamme"
      );

    const totalCount = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    deletedProduct.images.forEach((image) => {
      deleteImage(image);
    });
    console.log(deletedProduct);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
exports.countProducts = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ count: productCount });
  } catch (err) {
    console.error("Error counting products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    // Convert category to ObjectId
    const categoryObjectId = new mongoose.Types.ObjectId(category);

    // Find all products by category without pagination
    const products = await Product.find({ category: categoryObjectId })
      .populate("famille", "titlefr titleen")
      .populate("category", "titlefr titleen")
      .populate("type", "titlefr titleen")
      .select(
        "titlefr titleen price description images famille gamme marque category type"
      );
    // Send response
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};
