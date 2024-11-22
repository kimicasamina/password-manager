"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _corsOption = require("./middleware/corsOption");
var _logEvents = require("./middleware/logEvents");
var _sequelize = _interopRequireDefault(require("./db/config/sequelize"));
var _user = _interopRequireDefault(require("./api/routes/user"));
var _password = _interopRequireDefault(require("./api/routes/password"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();

// middlewares
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])(_corsOption.corsOption));

// custom middleware logger
app.use(_logEvents.logger);
app.use('/api/users/', _user["default"]);
app.use('/api/passwords', _password["default"]);

// global error handler
app.use('*', function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});
_sequelize["default"].sync().then(function () {
  console.log('Connection has been established successfully.');
  app.listen(process.env.PORT, function () {
    console.log("Server starts at http://localhost:".concat(process.env.PORT));
  });
})["catch"](function (error) {
  console.error('Unable to connect to the database: ', error);
});