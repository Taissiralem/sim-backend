const Newsletter = require("../models/Newsletter.js");
exports.createNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const newNewsletter = new Newsletter({
      email,
    });

    const savedNewsletter = await newNewsletter.save();
    res.status(201).json(savedNewsletter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Newsletter" });
  }
};

exports.getAllNewsletters = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const totalCount = await Newsletter.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const newsletters = await Newsletter.find()

      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({ newsletters, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch newsletters" });
  }
};
exports.countAllNewsletters = async (req, res) => {
  try {
    const NewsletterCount = await Newsletter.countDocuments();
    res.json({ count: NewsletterCount });
  } catch (err) {
    console.error("Error counting Newsletters:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
