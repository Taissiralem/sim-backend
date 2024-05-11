const mongoose = require("mongoose");

const { Schema } = mongoose;

const gammeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  marque: {
    type: mongoose.Types.ObjectId,
    ref: "Marque",
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Gamme = mongoose.model("Gamme", gammeSchema);

module.exports = Gamme;
