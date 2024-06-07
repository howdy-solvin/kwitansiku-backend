const SuperDao = require("./SuperDao");
const models = require("../models");

const BlankoFull = models.blanko_full;

class BlankoFullDao extends SuperDao {
  constructor() {
    super(BlankoFull);
  }
}

module.exports = BlankoFullDao;
