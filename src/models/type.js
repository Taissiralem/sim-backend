const mongoose = require("mongoose");

const { Schema } = mongoose;

const typeSchema = new Schema({
  titlefr: {
    type: String,
    required: true,
  },
  titleen: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
