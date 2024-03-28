const config = require('./config');
const mysql2 = require('mysql2');

module.exports = {
    development: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        port: config.port,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
};
