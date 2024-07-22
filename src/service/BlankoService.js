const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");
const { returnSuccess, returnError } = require("../helper/responseHandler");
const PatientTKIDao = require("../dao/PatientTkiDao");
const BlankoDao = require("../dao/BlankoDao");
const BlankoFullDao = require("../dao/BlankoFullDao");
const BlankoPraDao = require("../dao/BlankoPraDao");
const mainHelper = require("../helper");

class BlankoService {
  constructor() {
    this.blanko = new BlankoDao();
    this.patientTKIDao = new PatientTKIDao();
    this.blankoPra = new BlankoPraDao();
    this.blankoFull = new BlankoFullDao();
    this.mainHelper = new mainHelper();
  }

  getBlankoBasedOnPasien = async (uuid, type) => {
    try {
      let blankoFull;
      let blankoPra;
      switch (type) {
        case "full":
          blankoFull = await this.blanko.findAndPopulateOneBlankoFull(uuid);
          if (blankoFull.length == 0)
            return returnError(
              httpStatus.NOT_FOUND,
              "Data Blanko Full tidak ditemukan!"
            );
          else {
            const newBlankoFull = Object.fromEntries(
              Object.entries(blankoFull[0].dataValues).map(([key, value]) => [
                key,
                value instanceof Buffer
                  ? this.mainHelper.bufferToBase64(value)
                  : value,
              ])
            );
            return returnSuccess(
              httpStatus.OK,
              "Data Blanko Full terbaru berhasil diambil!",
              newBlankoFull
            );
          }
        case "pra":
          blankoPra = await this.blanko.findAndPopulateOneBlankoPra(uuid);
          if (blankoPra.length == 0)
            return returnError(
              httpStatus.NOT_FOUND,
              "Data Blanko Pra tidak ditemukan!"
            );
          else {
            const newBlankoPra = Object.fromEntries(
              Object.entries(blankoPra[0].dataValues).map(([key, value]) => [
                key,
                value instanceof Buffer
                  ? this.mainHelper.bufferToBase64(value)
                  : value,
              ])
            );
            return returnSuccess(
              httpStatus.OK,
              "Data Blanko Pra terbaru berhasil diambil!",
              newBlankoPra
            );
          }
        default:
          blankoFull = await this.blanko.findAndPopulateOneBlankoFull(uuid);
          blankoPra = await this.blanko.findAndPopulateOneBlankoPra(uuid);
          return returnSuccess(
            httpStatus.OK,
            "Data Blanko terbaru berhasil diambil!",
            {
              blanko_full: blankoFull[0],
              blanko_pra: blankoPra[0],
            }
          );
      }
    } catch (e) {
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat mengambil data Blanko!"
      );
    }
  };

  createBlankoFull = async (blankoFullData) => {
    try {
      const blankoFull = await this.blankoFull.create(blankoFullData);
      return returnSuccess(
        httpStatus.CREATED,
        "Data Blanko Full berhasil dibuat!",
        blankoFull
      );
    } catch (e) {
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat membuat data Blanko Full!"
      );
    }
  };

  createBlankoPra = async (blankoPraData, blankoData) => {
    try {
      const uuidBlanko = uuidv4();
      const image_blob = this.mainHelper.b64toBlob(
        blankoData.base64_image,
        blankoData.image_content_type
      );
      console.log("Data blob hasil", image_blob);

      const blanko = await this.blanko.createBlanko({
        uuid: uuidBlanko,
        image_blob: image_blob,
        ...blankoData,
      });

      const blankoPra = await this.blankoPra.create({
        blanko_id: uuidBlanko,
        ...blankoPraData,
      });

      return returnSuccess(
        httpStatus.CREATED,
        "Data Blanko Pra berhasil dibuat!",
        {
          ...blanko,
          blanko_pra: blankoPra,
        }
      );
    } catch (e) {
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat membuat data Blanko Pra!"
      );
    }
  };

  checkBlankoPra = async (pasienUUIDs) => {
    try {
      let createdPasien = [];
      for (let i = 0; i < pasienUUIDs.length; i++) {
        let blankoPra = await this.blanko.findAndPopulateOneBlankoPra(
          pasienUUIDs[i]
        );
        if (blankoPra.length > 0) {
          createdPasien.push(blankoPra[0].pasien_id);
        }
      }
      if (createdPasien.length == 0)
        return returnError(
          httpStatus.NOT_FOUND,
          "Data Blanko Pra tidak ditemukan!"
        );
      else {
        return returnSuccess(
          httpStatus.OK,
          "Data Blanko Pra terbaru berhasil diambil!",
          createdPasien
        );
      }
    } catch (e) {
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat membuat data Blanko Pra!"
      );
    }
  };
}

module.exports = BlankoService;
