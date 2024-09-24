const express = require("express");
const cors = require("cors");
//require .env
require("dotenv").config();
//db config
const connectDB = require("./config/db");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { resetPoint } = require("./helpers/nodecron");
const cookieParser = require("cookie-parser");

//init server
const server = express();

//init cors
server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

//use json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// access log
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
server.use(morgan("dev", { stream: logStream }));

//require routes

resetPoint.start();

const routes = require("./routes/index");

server.use(routes);

//run server
connectDB()
  .then((con) => {
    console.log(
      `database connected host:${con.connection.host},dbname:${con.connection.db.databaseName}`
    );

    server.listen(process.env.PORT, () => {
      console.log(
        `express server running on port ${process.env.PORT} in ${server.get(
          "env"
        )}`
      );
    });
  })
  .catch((err) => console.error("failed to connect to database", err));

module.exports = server;
