const httpStatus = require("http-status");
const BlankoService = require("../service/BlankoService");

class BlankoController {
  constructor() {
    this.blankoService = new BlankoService();
  }

  getOneBlanko = async (req, res) => {
    try {
      const blanko = await this.blankoService.getBlankoBasedOnPasien(
        req.params.pasien_uuid,
        req.query.type
      );
      res.status(blanko.statusCode).send(blanko.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  createBlankoFull = async (req, res) => {
    try {
      const blankoFullData = req.body;
      const blankoFull = await this.blankoService.createBlankoFull(
        blankoFullData
      );
      res.status(blankoFull.statusCode).send(blankoFull.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  createBlankoPra = async (req, res) => {
    try {
      const blankoData = req.body.blanko_main;
      const blankoPraData = req.body.blanko_pra;
      const blankoPra = await this.blankoService.createBlankoPra(
        blankoPraData,
        blankoData
      );
      res.status(blankoPra.statusCode).send(blankoPra.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = BlankoController;
