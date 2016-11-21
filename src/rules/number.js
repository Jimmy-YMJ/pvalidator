module.exports = function (min, max, error) {
  return function (num, success, failure) {
    if(typeof num !== "number"){
      error = typeof error !== 'undefined' ? error : "The :field must be a number.";
      failure(error);
    }
    var minType = typeof min,
      maxType = typeof max;
    if(minType === "number" && maxType === "number" && (num < min || num > max)){
      error = typeof error !== 'undefined' ? error : `The :field's must be between ${min} and ${max}.`;
      failure(error);
    }else if(minType === "number" && num < min){
      error = typeof error !== 'undefined' ? error : `The :field's must be at least ${min}.`;
      failure(error);
    }else if(maxType === "number" && num > max){
      error = typeof error !== 'undefined' ? error : `The :field's may not be greater than ${max}.`;
      failure(error);
    }
    success();
  }
};
