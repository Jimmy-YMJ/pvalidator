module.exports = function integer(int, success, failure, error){
  if(typeof int === "number" && /^\d+$/.test(int + "")){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not an integer.";
  failure(error);
};
