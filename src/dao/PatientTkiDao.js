const SuperDao = require("./SuperDao");
const models = require("../models");
const { Op } = require("sequelize");

const PatientTKI = models.pasien_tki;

class PatientTKIDao extends SuperDao {
  constructor() {
    super(PatientTKI);
  }

  async findAllByLimit(limit) {
    return PatientTKI.findAll({
      limit: limit,
      order: [["updatedAt", "DESC"]],
    });
  }

  async findAllLimitWhere(q, limit) {
    return PatientTKI.findAll({
      where: {
        nama_lengkap: { [Op.like]: "%" + q + "%" },
      },
      limit: limit,
      order: [["updatedAt", "DESC"]],
    });
  }
}

module.exports = PatientTKIDao;
