module.exports = function (min, max, error) {
  return function (str, success, failure) {
    if(typeof str !== "string"){
      error = typeof error !== 'undefined' ? error : "The :field must be a string.";
      failure(error);
    }
    var minType = typeof min,
      maxType = typeof max,
      strLen = str.length;
    if(minType === "number" && maxType === "number" && (strLen < min || strLen > max)){
      error = typeof error !== 'undefined' ? error : `The :field's length must be between ${min} and ${max}.`;
      failure(error);
    }else if(minType === "number" && strLen < min){
      error = typeof error !== 'undefined' ? error : `The :field's length must be at least ${min}.`;
      failure(error);
    }else if(maxType === "number" && strLen > max){
      error = typeof error !== 'undefined' ? error : `The :field's length may not be greater than ${max}.`;
      failure(error);
    }
    success();
  }
};
