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
            const imageType = blankoFull[0].dataValues.image_content_type;
            const newBlankoFull = Object.fromEntries(
              Object.entries(blankoFull[0].dataValues).map(([key, value]) => [
                key,
                value instanceof Buffer
                  ? this.mainHelper.bufferToBase64(value, imageType)
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
            const imageType = blankoPra[0].dataValues.image_content_type;
            const newBlankoPra = Object.fromEntries(
              Object.entries(blankoPra[0].dataValues).map(([key, value]) => [
                key,
                value instanceof Buffer
                  ? this.mainHelper.bufferToBase64(value, imageType)
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
          let newBlankoPra;
          if (blankoPra.length !== 0) {
            const imageType = blankoPra[0].dataValues.image_content_type;
            newBlankoPra = Object.fromEntries(
              Object.entries(blankoPra[0].dataValues).map(([key, value]) => [
                key,
                value instanceof Buffer
                  ? this.mainHelper.bufferToBase64(value, imageType)
                  : value,
              ])
            );
          }
          return returnSuccess(
            httpStatus.OK,
            "Data Blanko terbaru berhasil diambil!",
            { 
              ...newBlankoPra,
              blanko_full: blankoFull[0].blanko_full,
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
      const blankoPraExist = await this.blankoPra.findByWhere({
        blanko_id: blankoFullData.blanko_id,
      });
      if (blankoPraExist.length <= 0) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Blanko Pra belum dibuat, silahkan buat Blanko Pra terlebih dahulu!"
        );
      }

      const blankoFullExist = await this.blankoFull.findByWhere({
        blanko_id: blankoFullData.blanko_id,
      });

      if (blankoFullExist.length > 0) {
        return returnError(
          httpStatus.CONFLICT,
          "Data Blanko Full sudah ada, silahkan gunakan endpoint update!"
        );
      }

      const blankoFull = await this.blankoFull.create(blankoFullData);

      if (!blankoFull) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Terjadi kesalahan saat membuat data Blanko Full!"
        );
      }

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
      const blankoExist = await this.blanko.findByWhere({
        pasien_id: blankoData.pasien_id,
      });

      if (blankoExist.length > 0) {
        return returnError(
          httpStatus.CONFLICT,
          "Data Blanko sudah ada, silahkan gunakan endpoint update!"
        );
      }

      const uuidBlanko = uuidv4();
      const image_blob = this.mainHelper.b64toBlob(
        blankoData.base64_image,
        blankoData.image_content_type
      );

      const blanko = await this.blanko.createBlanko({
        uuid: uuidBlanko,
        image_blob: image_blob,
        ...blankoData,
      });

      if (!blanko) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Terjadi kesalahan saat membuat data Blanko!"
        );
      }

      const blankoPra = await this.blankoPra.create({
        blanko_id: uuidBlanko,
        ...blankoPraData,
      });

      if (!blankoPra) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Terjadi kesalahan saat membuat data Blanko Pra!"
        );
      }

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

  updateBlankoPra = async (pasienUUID, blankoPraData, blankoData) => {
    try {
      const blankoExist = await this.blanko.findByWhere({
        pasien_id: pasienUUID,
      });

      if (blankoExist.length <= 0) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Data Blanko tidak ditemukan!"
        );
      }

      const blankoPraExist = await this.blankoPra.findByWhere({
        blanko_id: blankoExist[0].uuid,
      });

      if (blankoPraExist.length <= 0) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Data Blanko Pra tidak ditemukan!"
        );
      }

      const image_blob = this.mainHelper.b64toBlob(
        blankoData.base64_image,
        blankoData.image_content_type
      );

      const blanko = await this.blanko.updateWhere(
        {
          image_blob: image_blob,
          ...blankoData,
        },
        {
          where: {
            pasien_id: pasienUUID,
          },
        }
      );

      if (!blanko || blanko[0] == 0) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Terjadi kesalahan saat mengupdate data Blanko!"
        );
      }

      const updatedBlankoPra = await this.blankoPra.updateById(
        blankoPraData,
        blankoPraExist[0].id
      );

      if (!updatedBlankoPra || updatedBlankoPra[0] == 0) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Blanko main berhasil diupdate, tetapi terjadi kesalahan saat mengupdate data Blanko Pra!"
        );
      }

      return returnSuccess(
        httpStatus.OK,
        "Data Blanko Pra berhasil diupdate!",
        {
          blanko: blankoData,
          blanko_pra: blankoPraData,
        }
      );
    } catch (e) {
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat membuat data Blanko Pra!"
      );
    }
  };

  updateBlankoFull = async (blankoFullData) => {
    try {
      const blankoExist = await this.blanko.findByWhere({
        uuid: blankoFullData.blanko_id,
      });

      if (blankoExist.length <= 0) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Blanko belum dibuat / tidak ada, silahkan buat Blanko terlebih dahulu!"
        );
      }

      const blankoFullExist = await this.blankoFull.findByWhere({
        blanko_id: blankoFullData.blanko_id,
      });

      if (blankoFullExist.length <= 0) {
        return returnError(
          httpStatus.NOT_FOUND,
          "Data Blanko Full tidak ditemukan!"
        );
      }

      const updatedBlankoFull = await this.blankoFull.updateById(
        blankoFullData,
        blankoFullExist[0].id
      );

      if (!updatedBlankoFull || updatedBlankoFull[0] == 0) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Terjadi kesalahan saat mengupdate data Blanko Full!"
        );
      }

      return returnSuccess(
        httpStatus.OK,
        "Data Blanko Full berhasil diupdate!",
        blankoFullData
      );
    } catch (e) {
      return returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        e.message || "Terjadi kesalahan saat membuat data Blanko Pra!"
      );
    }
  };
}

module.exports = BlankoService;
