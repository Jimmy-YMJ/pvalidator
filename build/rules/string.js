module.exports = function (min, max) {
  return function (str, success, failure) {
    if(typeof str !== "string"){
      failure("The :field must be a string.");
    }
    var minType = typeof min,
      maxType = typeof max,
      strLen = str.length;
    if(minType === "number" && maxType === "number" && (strLen < min || strLen > max)){
      failure(`The :field's length must be between ${min} and ${max}.`);
    }else if(minType === "number" && strLen < min){
      failure(`The :field's length must be at least ${min}.`);
    }else if(maxType === "number" && strLen > max){
      failure(`The :field's length may not be greater than ${max}.`);
    }
    success();
  }
};
