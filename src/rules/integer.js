module.exports = function integer(int, success, failure){
  if(typeof int === "number" && /^\d+$/.test(int + "")){
    success();
  }else{
    failure("The :field is not an integer.");
  }
};
