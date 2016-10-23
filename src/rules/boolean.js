module.exports = function boolean(bool, success, failure) {
  if(typeof bool === "boolean"){
    success();
  }else{
    failure("The :field is not a boolean.");
  }
};
