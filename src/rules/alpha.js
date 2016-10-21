module.exports = function (value, success, failure) {
  if(/^[a-zA-Z]+$/.test(value)){
    success();
  }
  failure("The :field can only contain alpha characters.");
};
