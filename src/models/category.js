const mongoose = require("mongoose");

const { Schema } = mongoose;

const cagtegorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  gamme: {
    type: mongoose.Types.ObjectId,
    ref: "Gamme",
  },
});

const Category = mongoose.model("Category", cagtegorySchema);

module.exports = Category;
