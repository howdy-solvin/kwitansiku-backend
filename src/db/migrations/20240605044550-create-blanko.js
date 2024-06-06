"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blankos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
      },
      bn_bt: {
        type: Sequelize.STRING,
      },
      tanggal_cetak: {
        type: Sequelize.DATE,
      },
      usia: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      jenis_kelamin: {
        type: Sequelize.CHAR,
      },
      negara: {
        type: Sequelize.STRING,
      },
      provinsi: {
        type: Sequelize.STRING,
      },
      daerah: {
        type: Sequelize.STRING,
      },
      pekerjaan_negara_tujuan: {
        type: Sequelize.STRING,
      },
      no_visa: {
        type: Sequelize.STRING,
      },
      no_passpor: {
        type: Sequelize.STRING,
      },
      masa_berlaku: {
        type: Sequelize.DATE,
      },
      sampai_dengan: {
        type: Sequelize.DATE,
      },
      status_blanko: {
        type: Sequelize.ENUM("pra", "full"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      image_blob: {
        type: Sequelize.BLOB,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blankos");
  },
};
