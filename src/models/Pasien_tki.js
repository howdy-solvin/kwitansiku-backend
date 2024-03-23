'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pasien_tki extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pasien_tki.init({
    uuid: DataTypes.UUID,
    negara_tujuan: DataTypes.STRING,
    nama_lengkap: DataTypes.STRING,
    usia: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.CHAR,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pasien_tki',
  });
  return pasien_tki;
};