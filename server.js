const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION 💥, Shutting down...");

  process.exit(1);
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});
// .catch((err) => console.log("DB connection error: ", err));

// console.log(app.get("env"));
// console.log(process.env);

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`App running on port ${port}...`)
);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION 💥, Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
