'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blanko_fulls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blanko_id: {
        type: Sequelize.UUID,
        references: {
          model: "blankos",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      hiv_status: {
        type: Sequelize.BOOLEAN
      },
      hiv_date: {
        type: Sequelize.DATE
      },
      tbc_status: {
        type: Sequelize.BOOLEAN
      },
      tbc_date: {
        type: Sequelize.DATE
      },
      malaria_status: {
        type: Sequelize.BOOLEAN
      },
      malaria_date: {
        type: Sequelize.DATE
      },
      leprosy_status: {
        type: Sequelize.BOOLEAN
      },
      leprosy_date: {
        type: Sequelize.DATE
      },
      std_status: {
        type: Sequelize.BOOLEAN
      },
      std_date: {
        type: Sequelize.DATE
      },
      asma_status: {
        type: Sequelize.BOOLEAN
      },
      asma_date: {
        type: Sequelize.DATE
      },
      hd_status: {
        type: Sequelize.BOOLEAN
      },
      hd_date: {
        type: Sequelize.DATE
      },
      hpts_status: {
        type: Sequelize.BOOLEAN
      },
      hpts_date: {
        type: Sequelize.DATE
      },
      dbm_status: {
        type: Sequelize.BOOLEAN
      },
      dbm_date: {
        type: Sequelize.DATE
      },
      ptu_status: {
        type: Sequelize.BOOLEAN
      },
      ptu_date: {
        type: Sequelize.DATE
      },
      kidney_status: {
        type: Sequelize.BOOLEAN
      },
      kidney_date: {
        type: Sequelize.DATE
      },
      cancer_status: {
        type: Sequelize.BOOLEAN
      },
      cancer_date: {
        type: Sequelize.DATE
      },
      epylepsy_status: {
        type: Sequelize.BOOLEAN
      },
      epylepsy_date: {
        type: Sequelize.DATE
      },
      psin_status: {
        type: Sequelize.BOOLEAN
      },
      psin_date: {
        type: Sequelize.DATE
      },
      hepo_status: {
        type: Sequelize.BOOLEAN
      },
      hepo_date: {
        type: Sequelize.DATE
      },
      hpts_status: {
        type: Sequelize.BOOLEAN
      },
      hpts_date: {
        type: Sequelize.DATE
      },
      other_status: {
        type: Sequelize.BOOLEAN
      },
      other_date: {
        type: Sequelize.DATE
      },
      snf_status: {
        type: Sequelize.BOOLEAN
      },
      nyd_status: {
        type: Sequelize.BOOLEAN
      },
      dbj_status: {
        type: Sequelize.BOOLEAN
      },
      pbk_status: {
        type: Sequelize.BOOLEAN
      },
      rspks_status: {
        type: Sequelize.BOOLEAN
      },
      hmp_status: {
        type: Sequelize.BOOLEAN
      },
      ksm_status: {
        type: Sequelize.BOOLEAN
      },
      rhb_sbk_status: {
        type: Sequelize.BOOLEAN
      },
      gskl_status: {
        type: Sequelize.BOOLEAN
      },
      kcuv_status: {
        type: Sequelize.BOOLEAN
      },
      nsm_status: {
        type: Sequelize.BOOLEAN
      },
      mpbw_status: {
        type: Sequelize.BOOLEAN
      },
      rkk_status: {
        type: Sequelize.BOOLEAN
      },
      pkln_status: {
        type: Sequelize.BOOLEAN
      },
      dfab_status: {
        type: Sequelize.BOOLEAN
      },
      anemia_status: {
        type: Sequelize.BOOLEAN
      },
      pkn_status: {
        type: Sequelize.BOOLEAN
      },
      tb_mt_kanan: {
        type: Sequelize.BOOLEAN
      },
      db_mt_kanan: {
        type: Sequelize.BOOLEAN
      },
      tgp_kanan: {
        type: Sequelize.BOOLEAN
      },
      kbw_kanan: {
        type: Sequelize.BOOLEAN
      },
      tb_mt_kiri: {
        type: Sequelize.BOOLEAN
      },
      db_mt_kiri: {
        type: Sequelize.BOOLEAN
      },
      tgp_kiri: {
        type: Sequelize.BOOLEAN
      },
      kbw_kiri: {
        type: Sequelize.BOOLEAN
      },
      ukj_status: {
        type: Sequelize.BOOLEAN
      },
      saj_status: {
        type: Sequelize.BOOLEAN
      },
      tl_jantung: {
        type: Sequelize.STRING
      },
      sp_status: {
        type: Sequelize.BOOLEAN
      },
      tl_sp: {
        type: Sequelize.STRING
      },
      hati_status: {
        type: Sequelize.BOOLEAN
      },
      limpa_status: {
        type: Sequelize.BOOLEAN
      },
      ginjal_status: {
        type: Sequelize.BOOLEAN
      },
      tl_sp_status: {
        type: Sequelize.BOOLEAN
      },
      tl_sp: {
        type: Sequelize.STRING
      },
      pr_sp_status: {
        type: Sequelize.BOOLEAN
      },
      smu_status: {
        type: Sequelize.BOOLEAN
      },
      berbicara_status: {
        type: Sequelize.BOOLEAN
      },
      fk_status: {
        type: Sequelize.BOOLEAN
      },
      usp_status: {
        type: Sequelize.BOOLEAN
      },
      km_status: {
        type: Sequelize.BOOLEAN
      },
      sensorik_status: {
        type: Sequelize.BOOLEAN
      },
      reflek_status: {
        type: Sequelize.BOOLEAN
      },
      psg_pbn_status: {
        type: Sequelize.BOOLEAN
      },
      luka_status: {
        type: Sequelize.BOOLEAN
      },
      elisa_status: {
        type: Sequelize.BOOLEAN
      },
      hbsag_status: {
        type: Sequelize.BOOLEAN
      },
      hct_status: {
        type: Sequelize.BOOLEAN
      },
      vdrl_tpha_status: {
        type: Sequelize.BOOLEAN
      },
      pama_status: {
        type: Sequelize.BOOLEAN
      },
      pafil_status: {
        type: Sequelize.BOOLEAN
      },
      ck_status: {
        type: Sequelize.BOOLEAN
      },
      cxray_report: {
        type: Sequelize.STRING
      },
      sptm_afb_status: {
        type: Sequelize.BOOLEAN
      },
      serum_krtnn: {
        type: Sequelize.STRING
      },
      warna_urin: {
        type: Sequelize.STRING
      },
      gravitasi_spesifik: {
        type: Sequelize.STRING
      },
      gula_status: {
        type: Sequelize.BOOLEAN
      },
      albumin_status: {
        type: Sequelize.BOOLEAN
      },
      pm_miros: {
        type: Sequelize.STRING
      },
      oga_status: {
        type: Sequelize.BOOLEAN
      },
      kehamilan_status: {
        type: Sequelize.BOOLEAN
      },
      urus_status: {
        type: Sequelize.BOOLEAN
      },
      stm_hiv_status: {
        type: Sequelize.BOOLEAN
      },
      stm_tbc_status: {
        type: Sequelize.BOOLEAN
      },
      stm_malaria_status: {
        type: Sequelize.BOOLEAN
      },
      stm_kusta_status: {
        type: Sequelize.BOOLEAN
      },
      stm_pms_status: {
        type: Sequelize.BOOLEAN
      },
      stm_hpb_status: {
        type: Sequelize.BOOLEAN
      },
      stm_hpc_status: {
        type: Sequelize.BOOLEAN
      },
      stm_filariasis_status: {
        type: Sequelize.BOOLEAN
      },
      gpu_status: {
        type: Sequelize.BOOLEAN
      },
      stm_pkl_status: {
        type: Sequelize.BOOLEAN
      },
      urine_oka_status: {
        type: Sequelize.BOOLEAN
      },
      dsh_status: {
        type: Sequelize.BOOLEAN
      },
      sehat_bekerja_status: {
        type: Sequelize.BOOLEAN
      },
      rekom_status: {
        type: Sequelize.BOOLEAN
      },
      rekom_alasan: {
        type: Sequelize.STRING
      },
      dokter: {
        type: Sequelize.STRING
      },
      masa_berlaku: {
        type: Sequelize.DATE
      },
      sampai_dengan: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blanko_fulls');
  }
};