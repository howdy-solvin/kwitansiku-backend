const express = require("express");
const authRoute = require("./authRoute");
const receiptRoute = require("./receiptRoute");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/receipt",
    route: receiptRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
