module.exports = function (judgement, success, failure) {
  if(judgement[0] == judgement[1]){
    success();
  }
  failure("The :field's value is not equal to given confirmation.");
};
