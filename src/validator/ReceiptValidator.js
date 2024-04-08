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
      jenis_kelamin: Joi.string()
        .valid(
          ...Object.values({
            L: "L",
            P: "P",
          })
        )
        .not(null),
      harga: Joi.number().not(null).required(),
    });
    const patientSchema = Joi.array()
      .items(patientItemsSchema)
      .not(null)
      .required();

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
      print_status: Joi.boolean().required(),
      tanggal: Joi.when("print_status", {
        is: Joi.boolean().valid(false),
        then: Joi.date().required(),
        otherwise: Joi.date().allow(null).allow(""),
      }),
      nama_penanggungjawab: Joi.when("print_status", {
        is: Joi.boolean().valid(false),
        then: Joi.string().max(100).required(),
        otherwise: Joi.string().allow(null).allow("").required(),
      }),
      nama_sponsor: Joi.when("print_status", {
        is: Joi.boolean().valid(false),
        then: Joi.string().max(100).required(),
        otherwise: Joi.string().allow(null).allow("").required(),
      }),
      keterangan: Joi.string().allow(null).allow("").max(255),
      total_pembayaran: Joi.when("print_status", {
        is: Joi.boolean().valid(false),
        then: Joi.number().required(),
        otherwise: Joi.number().allow(null).allow(""),
      }),
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
    const patientSchema = Joi.when("print_status", {
      is: false,
      then: Joi.array().items(patientItemsSchema).not(null).required(),
      otherwise: Joi.array().allow(null).allow("").required(),
    });

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
