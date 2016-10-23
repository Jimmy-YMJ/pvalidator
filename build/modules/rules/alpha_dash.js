"use strict";

module.exports = function (value, success, failure) {
  if (/^[a-zA-Z0-9_\-]+$/.test(value)) {
    success();
  }
  failure("The :field can only contain alphanumeric characters, dashes or underscores.");
};