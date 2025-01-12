"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const uuid = uuidv4();
    const password = bcrypt.hashSync("Solvin123.", 8);
    await queryInterface.insert("users", {
      id: 1,
      uuid: uuid,
      name: "Admin Solvin",
      email: "hello@solvin.id",
      password: password,
      status: 1,
      email_verified: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
