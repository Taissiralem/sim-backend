const mongoose = require("mongoose");

const { Schema } = mongoose;

const familleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Famille = mongoose.model("Famille", familleSchema);

module.exports = Famille;
