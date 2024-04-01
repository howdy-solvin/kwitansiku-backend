const SuperDao = require("./SuperDao");
const models = require("../models");

const Receipt = models.receipt;

class ReceiptDao extends SuperDao {
  constructor() {
    super(Receipt);
  }

  async findAndPopulatePatientTKI(uuid) {
    return Receipt.findAll({
      where: { uuid },
      include: {
        model: models.pasien_tki,
        required: true,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  async findByCurrentDate() {
    return Receipt.findAll({
      where: {
        createdAt: {
          [models.Sequelize.Op.gte]: new Date(new Date().setHours(0o0, 0o0, 0o0)),
          [models.Sequelize.Op.lte]: new Date(new Date().setHours(23, 59, 59)),
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }
}

module.exports = ReceiptDao;
