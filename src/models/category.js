const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  famille: {
    type: mongoose.Types.ObjectId,
    ref: "Famille",
  },
  types: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Type",
    },
  ],
});

const Category = mongoose.model("Category", categorieSchema);

module.exports = Category;
