const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    marque: {
      type: mongoose.Types.ObjectId,
      ref: "Marque",
    },
    gamme: {
      type: mongoose.Types.ObjectId,
      ref: "Gamme",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
