const mongoose = require("mongoose");
const { Schema } = mongoose;
const NewsletterShema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Newsletter = mongoose.model("Newsletter", NewsletterShema);

module.exports = Newsletter;
