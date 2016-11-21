module.exports = function (url, success, failure, error) {
  var re = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  if(re.test(url)){
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not a url.";
  failure(error);
};
