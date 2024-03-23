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
}

module.exports = ReceiptDao;
