const express = require("express");
const authRoute = require("./authRoute");
const receiptRoute = require("./receiptRoute");
const blankoRoute = require("./blankoRoute");

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
  {
    path: "/blanko",
    route: blankoRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
