"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOption = void 0;
var WHITELIST = ['https://www.google.com', 'http://127.0.0.1:8000', 'http://localhost:5173'];
var corsOption = exports.corsOption = {
  origin: function origin(_origin, callback) {
    if (WHITELIST.indexOf(_origin) !== -1 || !_origin) {
      console.log('CORS ORIGIN: ', _origin);
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};