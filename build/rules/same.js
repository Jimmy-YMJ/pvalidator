"use strict";

module.exports = function (judgement, success, failure) {
  if (judgement[0] === judgement[1]) {
    success();
  }
  failure("The :field's value is not same with given confirmation.");
};