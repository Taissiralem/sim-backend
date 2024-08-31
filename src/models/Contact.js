const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    field: {
      type: String,
    },
    need: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    CompanyName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    wilaya: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
