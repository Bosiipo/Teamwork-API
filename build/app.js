"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _cors = _interopRequireDefault(require("cors"));

var _database = _interopRequireDefault(require("./config/database"));

var _admin = _interopRequireDefault(require("./routes/admin.routes"));

var _employee = _interopRequireDefault(require("./routes/employee.routes"));

var _article = _interopRequireDefault(require("./routes/article.routes"));

var _gif = _interopRequireDefault(require("./routes/gif.routes"));

var _tag = _interopRequireDefault(require("./routes/tag.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Database
// Routes
var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;
var VERSION_API = '/api/v1';
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _expressFileupload["default"])());
app.use((0, _cors["default"])());
app.get('/', function (req, res) {
  res.status(200).send('It works!');
}); // handler

app.use("".concat(VERSION_API, "/auth/admin"), _admin["default"]);
app.use("".concat(VERSION_API, "/auth/employee"), _employee["default"]);
app.use("".concat(VERSION_API, "/articles"), _article["default"]);
app.use("".concat(VERSION_API, "/gifs"), _gif["default"]);
app.use("".concat(VERSION_API, "/tags"), _tag["default"]); // Test db

_database["default"].sync().then(function () {
  app.listen(PORT);
  console.log("Our app is running on port ".concat(PORT));
  console.log('Database connected...');
})["catch"](function (e) {
  return console.log('error...', e);
});

var _default = app;
exports["default"] = _default;