const db = require("../db/knex");

const User = {
  async create(name, email) {
    return await db("users").insert({ name, email }).returning("*");
  },

  async getAll() {
    return await db("users").select("*");
  },

  async getById(id) {
    return await db("users").where({ id }).first();
  },
};

module.exports = User;
