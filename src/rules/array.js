module.exports = function array(arr, success, failure) {
  if(Object.prototype.toString.call(arr) === "[object Array]"){
    success();
  }else{
    failure("The :field is not an array.");
  }
};
