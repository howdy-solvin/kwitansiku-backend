const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");

class ReceiptValidator {
  async createReceiptTKIValidator(req, res, next) {
    const receiptSchema = Joi.object({
      tanggal: Joi.date().not(null).required(),
      no_pendaftaran: Joi.string().max(50).not(null).required(),
      nama_penanggungjawab: Joi.string().max(100).not(null).required(),
      nama_sponsor: Joi.string().max(100).not(null).required(),
      keterangan: Joi.string().allow(null).allow("").max(255),
      total_pembayaran: Joi.number().not(null).required(),
    });

    const patientItemsSchema = Joi.object({
      no_form: Joi.string().max(50).not(null).required(),
      negara_tujuan: Joi.string().max(50).not(null).required(),
      nama_lengkap: Joi.string().max(100).not(null).required(),
      usia: Joi.number().not(null),
      jenis_kelamin: Joi.string().valid(
        ...Object.values({
          L: "L",
          P: "P",
        })
      ).not(null),
      harga: Joi.number().not(null).required(),
    });
    const patientSchema = Joi.array().items(patientItemsSchema).not(null).required();

    const schema = Joi.object({
      receipt: receiptSchema,
      patient: patientSchema,
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }

  async updateReceiptTKIValidator(req, res, next) {
    const receiptSchema = Joi.object({
      tanggal: Joi.date().required(),
      nama_penanggungjawab: Joi.string().max(100).required(),
      nama_sponsor: Joi.string().max(100).required(),
      keterangan: Joi.string().valid(null, "").max(255),
      total_pembayaran: Joi.number().required(),
    });

    const patientItemsSchema = Joi.object({
      uuid: Joi.string().uuid().required(),
      no_form: Joi.string().max(50).not(null).required(),
      negara_tujuan: Joi.string().max(50).required(),
      nama_lengkap: Joi.string().max(100).required(),
      usia: Joi.number(),
      jenis_kelamin: Joi.string().valid(
        ...Object.values({
          L: "L",
          P: "P",
        })
      ),
      harga: Joi.number().required(),
    });
    const patientSchema = Joi.array().items(patientItemsSchema).not(null).required();

    const schema = Joi.object({
      receipt: receiptSchema,
      patient: patientSchema,
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }
}

module.exports = ReceiptValidator;
