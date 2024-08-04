const express = require("express");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const routes = require("./route");
const { jwtStrategy } = require("./config/passport");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./helper/ApiError");

process.env.PWD = process.cwd();

const app = express();

app.use(
  cors({
    origin: [
      "https://kwitansiku-dev.vercel.app",
      "https://klinikgora.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: [
      "https://kwitansiku-dev.vercel.app",
      "https://klinikgora.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", async (req, res) => {
  res.status(200).send("It's working!");
});
app.use("/api", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);
const db = require("./models");

// Uncomment this line if you want to sync database model
// db.sequelize.sync()

module.exports = app;
