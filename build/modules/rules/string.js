"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (min, max) {
  return function (str, success, failure) {
    if (typeof str !== "string") {
      failure("The :field must be a string.");
    }
    var minType = typeof min === "undefined" ? "undefined" : _typeof(min),
        maxType = typeof max === "undefined" ? "undefined" : _typeof(max),
        strLen = str.length;
    if (minType === "number" && maxType === "number" && (strLen < min || strLen > max)) {
      failure("The :field's length must be between " + min + " and " + max + ".");
    } else if (minType === "number" && strLen < min) {
      failure("The :field's length must be at least " + min + ".");
    } else if (maxType === "number" && strLen > max) {
      failure("The :field's length may not be greater than " + max + ".");
    }
    success();
  };
};