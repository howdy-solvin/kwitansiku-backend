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
      this.hasOne(models.blanko, {
        foreignKey: "pasien_id",
        sourceKey: "uuid",
      });
      models.blanko.belongsTo(this, {
        foreignKey: "pasien_id",
        sourceKey: "uuid",
      });
    }
  }
  pasien_tki.init({
    uuid: DataTypes.UUID,
    no_form: DataTypes.STRING,
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