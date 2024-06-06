'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blanko_pra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blanko_pra.init({
    tinggi: DataTypes.INTEGER,
    berat: DataTypes.INTEGER,
    mata_kanan: DataTypes.STRING,
    mata_kiri: DataTypes.STRING,
    tekanan_darah_atas: DataTypes.INTEGER,
    tekanan_darah_bawah: DataTypes.INTEGER,
    tekanan_darah_nadi: DataTypes.INTEGER,
    golongan_darah: DataTypes.ENUM('A', 'B', 'AB', 'O'),
    suhu_tubuh: DataTypes.INTEGER,
    rontgen: DataTypes.ENUM('Normal', 'Tidak Normal'),
    gula: DataTypes.BOOLEAN,
    protein: DataTypes.BOOLEAN,
    ph: DataTypes.INTEGER,
    hbs_ag: DataTypes.BOOLEAN,
    vdrl: DataTypes.BOOLEAN,
    tpha: DataTypes.BOOLEAN,
    thorax_pa: DataTypes.ENUM('Normal', 'Tidak Normal'),
    hasil: DataTypes.BOOLEAN,
    keterangan: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blanko_pra',
  });
  return blanko_pra;
};