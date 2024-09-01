const Contact = require("../models/Contact.js");
exports.createContactMessage = async (req, res) => {
  try {
    const {
      email,
      field,
      need,
      name,
      wilaya,
      CompanyName,
      message,
      phonenumber,
    } = req.body;
    const newContact = new Contact({
      field,
      need,
      name,
      CompanyName,
      email,
      wilaya,
      message,
      phonenumber,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Contact" });
  }
};

exports.getAllMessage = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Contact.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const Contacts = await Contact.find()

      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({ Contacts, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Contacts" });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ error: "contact not found" });
    }
    res.status(200).json({ message: "contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
