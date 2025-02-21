const Cart = require("../models/cart");

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [productId] });
    } else {
      if (!cart.products.includes(productId)) {
        cart.products.push(productId);
      }
    }

    await cart.save();
    res.status(200).json({ message: "Produit ajouté au panier", cart });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Retirer un produit du panier
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Panier non trouvé" });

    cart.products = cart.products.filter((p) => p.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: "Produit retiré du panier", cart });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Vider le panier
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({ message: "Panier vidé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Obtenir le panier de l'utilisateur
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId }).populate("products");

    if (!cart) return res.status(404).json({ message: "Panier vide" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
