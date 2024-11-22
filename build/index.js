"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.listen(process.env.PORT, function () {
  console.log("Server starts at http://localhost:".concat(process.env.PORT));
});