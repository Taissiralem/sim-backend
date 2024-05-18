const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommandesSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
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
