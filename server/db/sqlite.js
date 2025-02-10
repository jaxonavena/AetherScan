const knex = require("knex");
const path = require("path");
require("dotenv").config();

const db = knex({
  client: "sqlite3",
  connection: {
    filename: process.env.SQLITE_DB_PATH,
  },
  useNullAsDefault: true,
});

module.exports = db;
