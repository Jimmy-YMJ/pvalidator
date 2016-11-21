module.exports = function (value, success, failure, error) {
  if(/^[a-zA-Z]+$/.test(value)){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field can only contain alpha characters.";
  failure(error);
};
