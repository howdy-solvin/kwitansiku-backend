const SuperDao = require("./SuperDao");
const models = require("../models");
const { where } = require("sequelize");

const Blanko = models.blanko;

class BlankoDao extends SuperDao {
  constructor() {
    super(Blanko);
  }

  async findAndPopulateOneBlankoPra(pasien_id) {
    return Blanko.findAll({
      where: { pasien_id: pasien_id },
      include: [
        {
          model: models.blanko_pra,
          required: true,
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  async findAndPopulateOneBlankoFull(pasien_id) {
    return Blanko.findAll({
      where: { pasien_id },
      include: [
        {
          model: models.blanko_full,
          required: true,
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  async createBlanko(data) {
    try {
      const newData = new this.Model(data);
      return newData
        .save()
        .then((result) => {
          //   return result;
          return {
            pasien_id: result.dataValues.pasien_id,
            tanggal_lahir: result.dataValues.tanggal_lahir,
            bn_bt: result.dataValues.bn_bt,
            tanggal_cetak: result.dataValues.tanggal_cetak,
            usia: result.dataValues.usia,
            status: result.dataValues.status,
            jenis_kelamin: result.dataValues.jenis_kelamin,
            negara: result.dataValues.negara,
            provinsi: result.dataValues.provinsi,
            daerah: result.dataValues.daerah,
            pekerjaan_negara_tujuan: result.dataValues.pekerjaan_negara_tujuan,
            no_visa: result.dataValues.no_visa,
            no_passpor: result.dataValues.no_passpor,
            masa_berlaku: result.dataValues.masa_berlaku,
            sampai_dengan: result.dataValues.sampai_dengan,
            status_blanko: result.dataValues.status_blanko,
          };
        })
        .catch((e) => {
          // logger.error(e);
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = BlankoDao;
