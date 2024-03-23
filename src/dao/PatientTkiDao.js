const SuperDao = require("./SuperDao");
const models = require("../models");

const PatientTKI = models.pasien_tki;

class PatientTKIDao extends SuperDao {
  constructor() {
    super(PatientTKI);
  }
}

module.exports = PatientTKIDao;
