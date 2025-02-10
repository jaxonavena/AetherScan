const knex = require("knex");
const path = require("path");
require("dotenv").config();

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "..", "database.sqlite"), // Stores DB in server root
  },
  useNullAsDefault: true, // SQLite requires this for null values
});

module.exports = db;
