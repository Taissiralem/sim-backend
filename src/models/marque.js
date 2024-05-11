const mongoose = require("mongoose");

const { Schema } = mongoose;

const marqueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  gammes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Gamme",
    },
  ],
});

const Marque = mongoose.model("Marque", marqueSchema);

module.exports = Marque;
