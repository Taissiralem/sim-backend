const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    field : {
      type: String,
      required:true
    },
    need: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    CompanyName: {
      type: String,
    },
    email: {
      type: String,
      required:true
    },
    country: {
      type: String,
      required:true
    },
    message: {
        type: String,
        required:true
    },
    
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
