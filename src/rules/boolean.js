module.exports = function boolean(bool, success, failure, error) {
  if(typeof bool === "boolean"){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not a boolean.";
  failure(error);
};
