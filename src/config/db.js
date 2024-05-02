const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabase = () => mongoose.connect(process.env.DB_URI);

module.exports = connectDatabase;
