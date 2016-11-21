module.exports = function(rule, error){
  return function (value, success, failure) {
    rule(value, success, failure, error);
  }
};