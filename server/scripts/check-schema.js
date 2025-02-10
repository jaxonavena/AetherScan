#!/usr/bin/env node
// keep this ^

const path = require('path');
const knex = require('knex')(require(path.resolve('knexfile.js')).development);

async function checkSchema() {
  try {
    // list all our tables
    const tables = await knex.raw("SELECT name FROM sqlite_master WHERE type='table';");
    console.log('Tables in the database:', tables);
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    knex.destroy();  // kill db connection
  }
}

checkSchema();