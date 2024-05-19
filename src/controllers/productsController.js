const Product = require("../models/product");
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
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
      title,
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
exports.getAllProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const products = await Product.find()
      .populate("famille", "title")
      .populate("category", "title")
      .populate("type", "title")
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error(error);
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

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
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
