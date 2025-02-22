const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
