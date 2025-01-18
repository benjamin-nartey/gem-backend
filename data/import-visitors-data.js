const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Visitor = require("../models/visitorModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => console.log("DB connection error: ", err));

const visitors = JSON.parse(
  fs.readFileSync(`${__dirname}/visitors.json`, "utf-8")
);

const importData = async () => {
  try {
    await Visitor.create(visitors);
    console.log("Data successfuly loaded!");
    process.exit()
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Visitor.deleteMany();
    console.log("Data successfuly deleted!");
    process.exit()
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[process.argv.length - 1] === "--import") {
  importData();
} else if (process.argv[process.argv.length - 1] === "--delete") {
  deleteData();
}

console.log(process.argv);
