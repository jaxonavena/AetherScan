#!/usr/bin/env node
// keep this ^

const path = require('path');
const knex = require('knex')(require(path.resolve('knexfile.js')).development);

async function checkSchema() {
  const table_name = process.argv[2]

  if (table_name === undefined || table_name === null) {
    console.log("\nExpecting a table_name argument! Ex: ./scripts/check-table-schema.js <table_name>\n");
    process.exit(1);
  }

  try {
    const table = await knex.raw(`SELECT * FROM ${table_name};`);
    console.log(`${table_name}:\n`, table);
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    knex.destroy();  // kill db connection
  }
}

checkSchema();