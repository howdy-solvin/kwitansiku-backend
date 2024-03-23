const httpStatus = require("http-status");
const ReceiptService = require("../service/ReceiptService");

class ReceiptController {
  constructor() {
    this.receiptService = new ReceiptService();
  }

  getAll = async (req, res) => {
    try {
      const receipts = await this.receiptService.getAllReceipt();
      res.status(receipts.statusCode).send(receipts.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getOne = async (req, res) => {
    try {
      const { uuid } = req.params;
      const receipt = await this.receiptService.getReceiptDetail(uuid);
      res.status(receipt.statusCode).send(receipt.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  createReceiptTKI = async (req, res) => {
    try {
      const { receipt, patient } = req.body;
      const newReceipt = await this.receiptService.createReceiptTKI(
        receipt,
        patient
      );
      res.status(newReceipt.statusCode).send(newReceipt.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  updateReceiptTKI = async (req, res) => {
    try {
      const { uuid } = req.params;
      const { receipt, patient } = req.body;
      const updatedReceipt = await this.receiptService.updateReceiptTKI(
        uuid,
        receipt,
        patient
      );
      res.status(updatedReceipt.statusCode).send(updatedReceipt.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  deleteReceipt = async (req, res) => {
    try {
      const { uuid } = req.params;
      const deletedReceipt = await this.receiptService.deleteByUUID(uuid);
      res.status(deletedReceipt.statusCode).send(deletedReceipt.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = ReceiptController;
