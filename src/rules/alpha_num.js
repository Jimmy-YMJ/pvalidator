module.exports = function (value, success, failure, error) {
  if(/^[a-zA-Z0-9]+$/.test(value)){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field must be alphanumeric.";
  failure(error);
};
