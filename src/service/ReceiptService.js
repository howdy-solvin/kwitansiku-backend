const httpStatus = require("http-status");
const PatientTKIDao = require("../dao/PatientTkiDao");
const ReceiptDao = require("../dao/ReceiptDao");
const { v4: uuidv4 } = require("uuid");
const { returnSuccess, returnError } = require("../helper/responseHandler");
// const logger = require("../config/logger");

class ReceiptService {
  constructor() {
    this.receiptDao = new ReceiptDao();
    this.PatientTKIDao = new PatientTKIDao();
  }

  getReceiptByCurrentDate = async () => {
    try {
      const receipt = await this.receiptDao.findByCurrentDate();
      return returnSuccess(
        httpStatus.OK,
        "Data ID terbaru untuk hari ini berhasil diambil!",
        {
          today_data_length: receipt.length,
          new_regist_id: `${String(new Date().getDate()).padStart(2, "0")}-${String(
            new Date().getMonth() + 1
          ).padStart(2, "0")}-${String(new Date().getFullYear())}/${String(
            receipt.length + 1
          ).padStart(3, "0")}`,
        }
      );
    } catch (e) {
      // logger.error(e);
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat mengambil data kwitansi!"
      );
    }
  };

  getAllReceipt = async () => {
    try {
      const receipt = await this.receiptDao.findAll();
      return returnSuccess(
        httpStatus.OK,
        "Semua data kwitansi berhasil diambil!",
        receipt
      );
    } catch (e) {
      // logger.error(e);
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat mengambil data kwitansi!"
      );
    }
  };

  getReceiptDetail = async (uuid) => {
    try {
      const receipt = await this.receiptDao.findAndPopulatePatientTKI(uuid);
      if (receipt[0] === undefined) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Data kwitansi tidak ditemukan!"
        );
      } else {
        return returnSuccess(
          httpStatus.OK,
          "Data kwitansi berhasil diambil!",
          receipt[0]
        );
      }
    } catch (e) {
      // logger.error(e);
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat mengambil data kwitansi!"
      );
    }
  };

  createReceiptTKI = async (receipt, patient) => {
    try {
      const uuidReceipt = uuidv4();
      const totalHarga = patient.reduce((acc, item) => {
        return acc + item.harga;
      }, 0);
      console.log("INI HARGANYA - ", totalHarga);
      const newReceipt = await this.receiptDao.create({
        uuid: uuidReceipt,
        total_harga: totalHarga,
        total_pendaftar: patient.length,
        ...receipt,
      });

      const updatedPatientUUID = patient.map((item) => {
        const patientUuid = uuidv4();
        return {
          uuid: patientUuid,
          receipt_id: uuidReceipt,
          ...item,
        };
      });

      const newPatient = await this.PatientTKIDao.bulkCreate(
        updatedPatientUUID
      );

      if (!newReceipt) {
        return returnError(
          httpStatus.FAILED_DEPENDENCY,
          "Terdapat kesalahan, data Kwitansi tidak berhasil dibuat!, data pasien telah dihapus!"
        );
      }

      if (!newPatient) {
        return returnError(
          httpStatus.FAILED_DEPENDENCY,
          "Terdapat kesalahan, data Pasien tidak berhasil dibuat!, data kwitansi telah dihapus!"
        );
      }

      return returnSuccess(
        httpStatus.CREATED,
        "Data Kwitansi berhasil dibuat!",
        { receipt: newReceipt, patient: newPatient }
      );
    } catch (e) {
      // logger.error(e);
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat membuat data kwitansi!"
      );
    }
  };

  updateReceiptTKI = async (uuid, receipt, patient) => {
    try {
      let isErrorPatient = false;
      const totalHarga = patient.reduce((acc, item) => {
        return acc + item.harga;
      }, 0);
      const updatedReceipt = await this.receiptDao.updateWhere(
        {
          total_harga: totalHarga,
          total_pendaftar: patient.length,
          ...receipt,
        },
        {
          where: { uuid: uuid },
        }
      );
      patient.every(async (patientItem) => {
        const updatedPatient = await this.PatientTKIDao.updateWhere(
          patientItem,
          { where: { uuid: patientItem.uuid } }
        );
        if (updatedPatient[0] == 0) {
          isErrorPatient = true;
          return false;
        }
        return true;
      });

      if (!updatedReceipt) {
        return returnError(
          httpStatus.FAILED_DEPENDENCY,
          "Terdapat kesalahan, data Kwitansi tidak berhasil diupdate!, data pasien telah dihapus!"
        );
      }

      if (isErrorPatient) {
        return returnError(
          httpStatus.FAILED_DEPENDENCY,
          "Terdapat kesalahan, data Pasien tidak berhasil diupdate!, data kwitansi telah dihapus!"
        );
      }

      return returnSuccess(
        httpStatus.CREATED,
        "Data Kwitansi berhasil diupdate!"
      );
    } catch (e) {
      // logger.error(e);
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat mengupdate data kwitansi!"
      );
    }
  };

  deleteByUUID = async (uuid) => {
    try {
      const deletedReceipt = await this.receiptDao.deleteByWhere({
        where: { uuid: uuid },
      });
      if (deletedReceipt == 0) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Data kwitansi tidak ditemukan!"
        );
      }
      return returnSuccess(httpStatus.OK, "Data kwitansi berhasil dihapus!");
    } catch (e) {
      // logger.error(e);
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat menghapus data kwitansi!"
      );
    }
  };
}

module.exports = ReceiptService;
