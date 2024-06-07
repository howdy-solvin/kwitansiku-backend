const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");

class BlankoValidator {
  async createBlankoPraValidator(req, res, next) {
    const blankoSchema = Joi.object({
      pasien_id: Joi.string().guid().max(50).not(null).required(),
      tanggal_lahir: Joi.date().not(null).required(),
      bn_bt: Joi.string().max(10).not(null).required(),
      tanggal_cetak: Joi.date().not(null).required(),
      usia: Joi.number().not(null).required(),
      status: Joi.string()
        .valid("Menikah", "Belum menikah", "Cerai hidup", "Cerai mati")
        .not(null)
        .required(),
      jenis_kelamin: Joi.string().valid("L", "P").not(null).required(),
      negara: Joi.string().max(50).not(null).required(),
      provinsi: Joi.string().max(50).not(null).required(),
      daerah: Joi.string().max(50).not(null).required(),
      pekerjaan_negara_tujuan: Joi.string().max(50).not(null).required(),
      no_visa: Joi.string().max(50).not(null).required(),
      no_passpor: Joi.string().max(50).not(null).required(),
      masa_berlaku: Joi.date().not(null).required(),
      sampai_dengan: Joi.date().not(null).required(),
      status_blanko: Joi.string().valid("pra").not(null).required(),
      base64_image: Joi.string()
        .base64({ paddingRequired: true })
        .not(null)
        .required(),
      image_content_type: Joi.string()
        .valid(
          "image/webp",
          "image/svg+xml",
          "image/png",
          "image/jpeg",
          "image/gif"
        )
        .not(null)
        .required(),
    });

    const blankoPraSchema = Joi.object({
      tinggi: Joi.number().greater(0).less(300).not(null).required(),
      berat: Joi.number().greater(0).less(200).not(null).required(),
      mata_kanan: Joi.string().max(10).not(null).required(),
      mata_kiri: Joi.string().max(10).not(null).required(),
      tekanan_darah_atas: Joi.number()
        .greater(0)
        .less(300)
        .not(null)
        .required(),
      tekanan_darah_bawah: Joi.number()
        .greater(0)
        .less(300)
        .not(null)
        .required(),
      tekanan_darah_nadi: Joi.number()
        .greater(0)
        .less(300)
        .not(null)
        .required(),
      golongan_darah: Joi.string()
        .valid("A", "B", "AB", "O")
        .not(null)
        .required(),
      suhu_tubuh: Joi.number().greater(0).less(100).not(null).required(),
      rontgen: Joi.string()
        .valid("Normal", "Tidak Normal")
        .not(null)
        .required(),
      gula: Joi.boolean().not(null).required(),
      protein: Joi.boolean().not(null).required(),
      ph: Joi.number().greater(0).less(14).not(null).required(),
      hbs_ag: Joi.boolean().not(null).required(),
      vdrl: Joi.boolean().not(null).required(),
      tpha: Joi.boolean().not(null).required(),
      thorax_pa: Joi.string()
        .valid("Normal", "Tidak Normal")
        .not(null)
        .required(),
      hasil: Joi.boolean().not(null).required(),
      keterangan: Joi.string().max(255).not(null).required(),
      pic: Joi.string().max(200).not(null).required(),
    });

    const schema = Joi.object({
      blanko_main: blankoSchema.not(null).required(),
      blanko_pra: blankoPraSchema.not(null).required(),
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

  async createBlankoFullValidator(req, res, next) {
    const blankoFullSchema = Joi.object({
      blanko_id: Joi.string().guid().max(50).not(null).required(),
      hiv_status: Joi.boolean().not(null).required(),
      hiv_date: Joi.date().not(null).required(),
      tbc_status: Joi.boolean().not(null).required(),
      tbc_date: Joi.date().not(null).required(),
      malaria_status: Joi.boolean().not(null).required(),
      malaria_date: Joi.date().not(null).required(),
      leprosy_status: Joi.boolean().not(null).required(),
      leprosy_date: Joi.date().not(null).required(),
      std_status: Joi.boolean().not(null).required(),
      std_date: Joi.date().not(null).required(),
      asma_status: Joi.boolean().not(null).required(),
      asma_date: Joi.date().not(null).required(),
      hd_status: Joi.boolean().not(null).required(),
      hd_date: Joi.date().not(null).required(),
      hpts_status: Joi.boolean().not(null).required(),
      hpts_date: Joi.date().not(null).required(),
      dbm_status: Joi.boolean().not(null).required(),
      dbm_date: Joi.date().not(null).required(),
      ptu_status: Joi.boolean().not(null).required(),
      ptu_date: Joi.date().not(null).required(),
      kidney_status: Joi.boolean().not(null).required(),
      kidney_date: Joi.date().not(null).required(),
      cancer_status: Joi.boolean().not(null).required(),
      cancer_date: Joi.date().not(null).required(),
      epylepsy_status: Joi.boolean().not(null).required(),
      epylepsy_date: Joi.date().not(null).required(),
      psin_status: Joi.boolean().not(null).required(),
      psin_date: Joi.date().not(null).required(),
      hepo_status: Joi.boolean().not(null).required(),
      hepo_date: Joi.date().not(null).required(),
      hpts_status: Joi.boolean().not(null).required(),
      hpts_date: Joi.date().not(null).required(),
      other_status: Joi.boolean().not(null).required(),
      other_date: Joi.date().not(null).required(),
      snf_status: Joi.boolean().not(null).required(),
      nyd_status: Joi.boolean().not(null).required(),
      dbj_status: Joi.boolean().not(null).required(),
      pbk_status: Joi.boolean().not(null).required(),
      rspks_status: Joi.boolean().not(null).required(),
      hmp_status: Joi.boolean().not(null).required(),
      ksm_status: Joi.boolean().not(null).required(),
      rhb_sbk_status: Joi.boolean().not(null).required(),
      gskl_status: Joi.boolean().not(null).required(),
      kcuv_status: Joi.boolean().not(null).required(),
      nsm_status: Joi.boolean().not(null).required(),
      mpbw_status: Joi.boolean().not(null).required(),
      rkk_status: Joi.boolean().not(null).required(),
      pkln_status: Joi.boolean().not(null).required(),
      dfab_status: Joi.boolean().not(null).required(),
      anemia_status: Joi.boolean().not(null).required(),
      pkn_status: Joi.boolean().not(null).required(),
      tb_mt_kanan: Joi.boolean().not(null).required(),
      db_mt_kanan: Joi.boolean().not(null).required(),
      tgp_kanan: Joi.boolean().not(null).required(),
      kbw_kanan: Joi.boolean().not(null).required(),
      tb_mt_kiri: Joi.boolean().not(null).required(),
      db_mt_kiri: Joi.boolean().not(null).required(),
      tgp_kiri: Joi.boolean().not(null).required(),
      kbw_kiri: Joi.boolean().not(null).required(),
      ukj_status: Joi.boolean().not(null).required(),
      saj_status: Joi.boolean().not(null).required(),
      tl_jantung: Joi.string().max(300),
      sps_status: Joi.boolean().not(null).required(),
      tl_sps: Joi.string().max(300).not(null).required(),
      hati_status: Joi.boolean().not(null).required(),
      limpa_status: Joi.boolean().not(null).required(),
      ginjal_status: Joi.boolean().not(null).required(),
      pbk_sp_status: Joi.boolean().not(null).required(),
      tl_sp: Joi.string().max(300),
      pr_sp_status: Joi.boolean().not(null).required(),
      smu_status: Joi.boolean().not(null).required(),
      berbicara_status: Joi.boolean().not(null).required(),
      fk_status: Joi.boolean().not(null).required(),
      usp_status: Joi.boolean().not(null).required(),
      km_status: Joi.boolean().not(null).required(),
      sensorik_status: Joi.boolean().not(null).required(),
      reflek_status: Joi.boolean().not(null).required(),
      psg_pbn_status: Joi.boolean().not(null).required(),
      luka_status: Joi.boolean().not(null).required(),
      elisa_status: Joi.boolean().not(null).required(),
      hbsag_status: Joi.boolean().not(null).required(),
      hct_status: Joi.boolean().not(null).required(),
      vdrl_tpha_status: Joi.boolean().not(null).required(),
      pama_status: Joi.boolean().not(null).required(),
      pafil_status: Joi.boolean().not(null).required(),
      ck_status: Joi.boolean().not(null).required(),
      cxray_status: Joi.boolean().not(null).required(),
      sptm_afb_status: Joi.boolean().not(null).required(),
      serum_krtnn: Joi.string().max(300).not(null).required(),
      warna_urin: Joi.string().max(300).not(null).required(),
      gravitasi_spesifik: Joi.string().max(300).not(null).required(),
      gula_status: Joi.boolean().not(null).required(),
      albumin_status: Joi.boolean().not(null).required(),
      pm_miros: Joi.string().max(300).not(null).required(),
      oga_status: Joi.boolean().not(null).required(),
      kehamilan_status: Joi.boolean().not(null).required(),
      urus_status: Joi.boolean().not(null).required(),
      stm_hiv_status: Joi.boolean().not(null).required(),
      stm_tbc_status: Joi.boolean().not(null).required(),
      stm_malaria_status: Joi.boolean().not(null).required(),
      stm_kusta_status: Joi.boolean().not(null).required(),
      stm_pms_status: Joi.boolean().not(null).required(),
      stm_hpb_status: Joi.boolean().not(null).required(),
      stm_hpc_status: Joi.boolean().not(null).required(),
      stm_filariasis_status: Joi.boolean().not(null).required(),
      gpu_status: Joi.boolean().not(null).required(),
      stm_pkl_status: Joi.boolean().not(null).required(),
      urine_oka_status: Joi.boolean().not(null).required(),
      dsh_status: Joi.boolean().not(null).required(),
      sehat_bekerja_status: Joi.boolean().not(null).required(),
      rekom_status: Joi.boolean().not(null).required(),
      rekom_alasan: Joi.string().max(300).not(null).required(),
      dokter: Joi.string().max(200).not(null).required(),
      masa_berlaku: Joi.date().not(null).required(),
      sampai_dengan: Joi.date().not(null).required(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    };

    const { error, value } = blankoFullSchema.validate(req.body, options);

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

module.exports = BlankoValidator;
