module.exports = function array(arr, success, failure, error) {
  if(Object.prototype.toString.call(arr) === "[object Array]"){
    success();
  }else{
    error = typeof error !== 'undefined' ? error : "The :field is not an array.";
    failure(error);
  }
};
