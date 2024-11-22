"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _corsOption = require("./middleware/corsOption");
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

// serve static files
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/build')));
app.get('^/$|/index(.html)?', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, 'views', 'index.html'));
});
// not found handler
app.get('/*', function (req, res) {
  res.status(404).sendFile(_path["default"].join(__dirname, 'views', '404_page.html'));
});
// global error handler
app.use('*', function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});
app.listen(process.env.PORT, function () {
  console.log("Server starts at http://localhost:".concat(process.env.PORT));
});