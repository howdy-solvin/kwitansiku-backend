"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pasien_tki, {
        foreignKey: "receipt_id",
        sourceKey: "uuid",
      });
      models.pasien_tki.belongsTo(this, {
        foreignKey: "receipt_id",
        sourceKey: "uuid",
      });
    }
  }
  receipt.init(
    {
      uuid: DataTypes.UUID,
      no_pendaftaran: DataTypes.STRING,
      tanggal: DataTypes.DATE,
      nama_penanggungjawab: DataTypes.STRING,
      nama_sponsor: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      total_pendaftar: DataTypes.INTEGER,
      total_harga: DataTypes.INTEGER,
      total_pembayaran: DataTypes.INTEGER,
      print_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "receipt",
    }
  );
  return receipt;
};
