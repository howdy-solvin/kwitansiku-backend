'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blanko extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.blanko_pra, {
        foreignKey: "blanko_id",
        sourceKey: "uuid",
      });
      models.blanko_pra.belongsTo(this, {
        foreignKey: "blanko_id",
        sourceKey: "uuid",
      });
      this.hasOne(models.blanko_full, {
        foreignKey: "blanko_id",
        sourceKey: "uuid",
      });
      models.blanko_full.belongsTo(this, {
        foreignKey: "blanko_id",
        sourceKey: "uuid",
      });
    }
  }
  Blanko.init({
    uuid: DataTypes.UUID,
    tanggal_lahir: DataTypes.DATE,
    bn_bt: DataTypes.STRING,
    tanggal_cetak: DataTypes.DATE,
    usia: DataTypes.INTEGER,
    status: DataTypes.STRING,
    jenis_kelamin: DataTypes.CHAR,
    negara: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    daerah: DataTypes.STRING,
    pekerjaan_negara_tujuan: DataTypes.STRING,
    no_visa: DataTypes.STRING,
    no_passpor: DataTypes.STRING,
    masa_berlaku: DataTypes.DATE,
    sampai_dengan: DataTypes.DATE,
    status_blanko: DataTypes.ENUM,
    image_blob: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'blanko',
  });
  return Blanko;
};