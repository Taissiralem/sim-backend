const { default: mongoose } = require("mongoose");
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
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.imageURLs;
    console.log(req.imageURLs);
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
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

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    // Convert category to ObjectId
    const categoryObjectId = new mongoose.Types.ObjectId(category);

    // Find products by category with pagination
    const products = await Product.find({ category: categoryObjectId })
      .populate("famille", "title")
      .populate("category", "title")
      .populate("type", "title")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select("title price description images famille category type");

    // Count total number of products in the specified category
    const totalCount = await Product.countDocuments({
      category: categoryObjectId,
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    // Send response
    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = 10;

//     const products = await Product.aggregate([
//       { $match: { category: mongoose.Types.ObjectId(category) } },
//       { $skip: (page - 1) * pageSize },
//       { $limit: pageSize },
//       {
//         $lookup: {
//           from: "familles",
//           localField: "famille",
//           foreignField: "_id",
//           as: "familleDetails",
//         },
//       },
//       { $unwind: "$familleDetails" },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryDetails",
//         },
//       },
//       { $unwind: "$categoryDetails" },
//       {
//         $lookup: {
//           from: "types",
//           localField: "type",
//           foreignField: "_id",
//           as: "typeDetails",
//         },
//       },
//       { $unwind: { path: "$typeDetails", preserveNullAndEmptyArrays: true } },
//       {
//         $project: {
//           title: 1,
//           price: 1,
//           description: 1,
//           images: 1,
//           famille: "$familleDetails.title",
//           category: "$categoryDetails.title",
//           type: "$typeDetails.title",
//         },
//       },
//     ]);

//     const totalCount = await Product.countDocuments({
//       category: mongoose.Types.ObjectId(category),
//     });
//     const totalPages = Math.ceil(totalCount / pageSize);

//     res.status(200).json({ products, totalPages });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch products by category" });
//   }
// };
