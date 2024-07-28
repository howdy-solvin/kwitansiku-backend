const SuperDao = require("./SuperDao");
const models = require("../models");

const BlankoPra = models.blanko_pra;

class BlankoPraDao extends SuperDao {
  constructor() {
    super(BlankoPra);
  }
}

module.exports = BlankoPraDao;
