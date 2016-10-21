module.exports = function (url, success, failure) {
  var re = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  if(re.test(url)){
    success();
  }
  failure("The :field is not a url.");
};
