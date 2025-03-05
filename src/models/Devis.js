const mongoose = require("mongoose");

const { Schema } = mongoose;

const DevisSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      // required: true,
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
