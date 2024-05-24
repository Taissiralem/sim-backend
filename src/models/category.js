const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorieSchema = new Schema({
  titlefr: {
    type: String,
    required: true,
  },
  titleen: {
    type: String,
    required: true,
  },
  famille: {
    type: mongoose.Types.ObjectId,
    ref: "Famille",
  },
  image: {
    type: String,
    required: true,
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
