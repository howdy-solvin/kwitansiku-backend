"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pasien_tkis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receipt_id: {
        type: Sequelize.UUID,
        references: {
          model: "receipts",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      negara_tujuan: {
        type: Sequelize.STRING,
      },
      nama_lengkap: {
        type: Sequelize.STRING,
      },
      usia: {
        type: Sequelize.INTEGER,
      },
      jenis_kelamin: {
        type: Sequelize.CHAR,
      },
      harga: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pasien_tkis");
  },
};
