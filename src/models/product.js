const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    titleen: {
      type: String,
      required: true,
    },
    titlefr: {
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
    famille: {
      type: mongoose.Types.ObjectId,
      ref: "Famille",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: mongoose.Types.ObjectId,
      ref: "Type",
    },
    marque: {
      type: String,
    },
    gamme: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
