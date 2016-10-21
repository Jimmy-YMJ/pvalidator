module.exports = function (value, success, failure) {
  if(/^[a-zA-Z0-9]+$/.test(value)){
    success();
  }
  failure("The :field must be alphanumeric.");
};
