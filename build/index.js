"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var PORT = 9000;
app.listen(PORT, function () {
  console.log("Server starts at http://localhost:".concat(PORT));
});