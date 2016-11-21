module.exports = function (judgement, success, failure, error) {
  if(judgement[0] == judgement[1]){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field's value is not equal to given confirmation.";
  failure(error);
};
