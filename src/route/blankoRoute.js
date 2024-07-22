const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const BlankoController = require("../controllers/BlankoController");
const BlankoValidator = require("../validator/BlankoValidator");

const blankoController = new BlankoController();
const blankoValidator = new BlankoValidator();

router.get("/one/:pasien_uuid", auth(), blankoController.getOneBlanko);
router.post(
  "/create/pra",
  auth(),
  blankoValidator.createBlankoPraValidator,
  blankoController.createBlankoPra
);
router.post(
  "/create/full",
  auth(),
  blankoValidator.createBlankoFullValidator,
  blankoController.createBlankoFull
);
router.post("/check/pra", auth(), blankoController.checkBlankoPra);

module.exports = router;
