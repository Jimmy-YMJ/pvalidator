module.exports = function (value, success, failure, error) {
  if(/^[a-zA-Z0-9_\-]+$/.test(value)){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field can only contain alphanumeric characters, dashes or underscores.";
  failure(error);
};
