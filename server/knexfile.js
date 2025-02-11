// Update with your config settings.
const path = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, "db", "database.sqlite"),
    },
    migrations: {
      directory: path.join(__dirname, "db", "migrations"),
    },
    useNullAsDefault: true, // Suppress the default value warning
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '__tests__', 'test-database.sqlite')
    },
    migrations: {
      directory: path.join(__dirname, "db", "migrations"),
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
