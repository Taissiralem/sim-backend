const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommandesSchema = new Schema(
  {
    quantity: {
      type: Number,
      default: 1,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: "String",
    },
    phoneNumber: {
      type: String,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Commandes = mongoose.model("Commandes", CommandesSchema);

module.exports = Commandes;
