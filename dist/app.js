"use strict";

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _router = _interopRequireDefault(require("./components/class/router"));

var _router2 = _interopRequireDefault(require("./components/user/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const app = (0, _express.default)(); // database setup

const mongoUri = process && process.env && process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.v74ky.mongodb.net/test?authSource=admin&replicaSet=atlas-aqz582-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true" || "mongodb://localhost/hcmusclassmanager";
const mongooseConfigs = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

_mongoose.default.connect(mongoUri, mongooseConfigs);

app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _helmet.default)());
app.use((0, _cors.default)());
app.use((0, _compression.default)());
app.use("/api/user", _router2.default);
app.use("/api/class", _router.default);
module.exports = app;