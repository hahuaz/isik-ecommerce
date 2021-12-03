const mongoose = require("mongoose");
const dotenv = require("dotenv");

/* read config firt to avoid err */
dotenv.config({
  path: `${__dirname}/config.env`,
});

// global sync err handler. it will show err
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTİON!");
  console.log(err);
  process.exit(1);
});

const app = require(`./app.js`);

const db = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(`failed to connect db. ${err}`);
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log("server is running...");
});

// global promise err handler. it will show err
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTİON!");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
