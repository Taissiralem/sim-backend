const mongoose = require("mongoose");

const { Schema } = mongoose;

const DevisSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    product: {
      type: String,
      ref: "Product",
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Devis = mongoose.model("Devis", DevisSchema);

module.exports = Devis;
