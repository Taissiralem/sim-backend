const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommandesSchema = new Schema(
  {
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
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalOrderPrice: {
      type: Number,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    num: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    adresse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Commandes = mongoose.model("Commandes", CommandesSchema);

module.exports = Commandes;
