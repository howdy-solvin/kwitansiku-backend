const config = require("./config");

module.exports = {
  development: {
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    dbPort: config.dbPort,
    host: config.dbHost,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    dbPort: config.dbPort,
    host: config.dbHost,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    dbPort: config.dbPort,
    host: config.dbHost,
    port: config.port,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
