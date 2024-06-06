"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blanko_pras", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      blanko_id: {
        type: Sequelize.UUID,
        references: {
          model: "blankos",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tinggi: {
        type: Sequelize.INTEGER,
      },
      berat: {
        type: Sequelize.INTEGER,
      },
      mata_kanan: {
        type: Sequelize.STRING,
      },
      mata_kiri: {
        type: Sequelize.STRING,
      },
      tekanan_darah_atas: {
        type: Sequelize.INTEGER,
      },
      tekanan_darah_bawah: {
        type: Sequelize.INTEGER,
      },
      tekanan_darah_nadi: {
        type: Sequelize.INTEGER,
      },
      golongan_darah: {
        type: Sequelize.ENUM,
        values: ["A", "B", "AB", "O"],
      },
      suhu_tubuh: {
        type: Sequelize.INTEGER,
      },
      rontgen: {
        type: Sequelize.ENUM,
        values: ["Normal", "Tidak Normal"],
      },
      gula: {
        type: Sequelize.BOOLEAN,
      },
      protein: {
        type: Sequelize.BOOLEAN,
      },
      ph: {
        type: Sequelize.INTEGER,
      },
      hbs_ag: {
        type: Sequelize.BOOLEAN,
      },
      vdrl: {
        type: Sequelize.BOOLEAN,
      },
      tpha: {
        type: Sequelize.BOOLEAN,
      },
      thorax_pa: {
        type: Sequelize.ENUM,
        values: ["Normal", "Tidak Normal"],
      },
      hasil: {
        type: Sequelize.BOOLEAN,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      pic: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("blanko_pras");
  },
};
