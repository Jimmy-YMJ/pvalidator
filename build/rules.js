(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.prules = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  alpha: _dereq_("./rules/alpha"),
  alpha_dash: _dereq_("./rules/alpha_dash"),
  alpha_num: _dereq_("./rules/alpha_num"),
  email: _dereq_("./rules/email"),
  equal: _dereq_("./rules/equal"),
  string: _dereq_("./rules/string"),
  url: _dereq_("./rules/url"),
  number: _dereq_("./rules/number"),
  boolean: _dereq_("./rules/boolean"),
  array: _dereq_("./rules/array"),
  integer: _dereq_("./rules/integer"),
  factory: _dereq_("./rules/factory")
};
},{"./rules/alpha":2,"./rules/alpha_dash":3,"./rules/alpha_num":4,"./rules/array":5,"./rules/boolean":6,"./rules/email":7,"./rules/equal":8,"./rules/factory":9,"./rules/integer":10,"./rules/number":11,"./rules/string":12,"./rules/url":13}],2:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value, success, failure, error) {
  if (/^[a-zA-Z]+$/.test(value)) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field can only contain alpha characters.";
  failure(error);
};
},{}],3:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value, success, failure, error) {
  if (/^[a-zA-Z0-9_\-]+$/.test(value)) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field can only contain alphanumeric characters, dashes or underscores.";
  failure(error);
};
},{}],4:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value, success, failure, error) {
  if (/^[a-zA-Z0-9]+$/.test(value)) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field must be alphanumeric.";
  failure(error);
};
},{}],5:[function(_dereq_,module,exports){
"use strict";

module.exports = function array(arr, success, failure, error) {
  if (Object.prototype.toString.call(arr) === "[object Array]") {
    success();
  } else {
    error = typeof error !== 'undefined' ? error : "The :field is not an array.";
    failure(error);
  }
};
},{}],6:[function(_dereq_,module,exports){
"use strict";

module.exports = function boolean(bool, success, failure, error) {
  if (typeof bool === "boolean") {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not a boolean.";
  failure(error);
};
},{}],7:[function(_dereq_,module,exports){
"use strict";

module.exports = function (email, success, failure, error) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not a valid email.";
  failure(error);
};
},{}],8:[function(_dereq_,module,exports){
"use strict";

module.exports = function (judgement, success, failure, error) {
  if (judgement[0] == judgement[1]) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field's value is not equal to given confirmation.";
  failure(error);
};
},{}],9:[function(_dereq_,module,exports){
"use strict";

module.exports = function (rule, error) {
  return function (value, success, failure) {
    rule(value, success, failure, error);
  };
};
},{}],10:[function(_dereq_,module,exports){
"use strict";

module.exports = function integer(int, success, failure, error) {
  if (typeof int === "number" && /^\d+$/.test(int + "")) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not an integer.";
  failure(error);
};
},{}],11:[function(_dereq_,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (min, max, error) {
  return function (num, success, failure) {
    if (typeof num !== "number") {
      error = typeof error !== 'undefined' ? error : "The :field must be a number.";
      failure(error);
    }
    var minType = typeof min === "undefined" ? "undefined" : _typeof(min),
        maxType = typeof max === "undefined" ? "undefined" : _typeof(max);
    if (minType === "number" && maxType === "number" && (num < min || num > max)) {
      error = typeof error !== 'undefined' ? error : "The :field's must be between " + min + " and " + max + ".";
      failure(error);
    } else if (minType === "number" && num < min) {
      error = typeof error !== 'undefined' ? error : "The :field's must be at least " + min + ".";
      failure(error);
    } else if (maxType === "number" && num > max) {
      error = typeof error !== 'undefined' ? error : "The :field's may not be greater than " + max + ".";
      failure(error);
    }
    success();
  };
};
},{}],12:[function(_dereq_,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (min, max, error) {
  return function (str, success, failure) {
    if (typeof str !== "string") {
      error = typeof error !== 'undefined' ? error : "The :field must be a string.";
      failure(error);
    }
    var minType = typeof min === "undefined" ? "undefined" : _typeof(min),
        maxType = typeof max === "undefined" ? "undefined" : _typeof(max),
        strLen = str.length;
    if (minType === "number" && maxType === "number" && (strLen < min || strLen > max)) {
      error = typeof error !== 'undefined' ? error : "The :field's length must be between " + min + " and " + max + ".";
      failure(error);
    } else if (minType === "number" && strLen < min) {
      error = typeof error !== 'undefined' ? error : "The :field's length must be at least " + min + ".";
      failure(error);
    } else if (maxType === "number" && strLen > max) {
      error = typeof error !== 'undefined' ? error : "The :field's length may not be greater than " + max + ".";
      failure(error);
    }
    success();
  };
};
},{}],13:[function(_dereq_,module,exports){
"use strict";

module.exports = function (url, success, failure, error) {
  var re = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  if (re.test(url)) {
    success();
  }
  error = typeof error !== 'undefined' ? error : "The :field is not a url.";
  failure(error);
};
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8uNi4wLjFAYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnVpbGQvbW9kdWxlcy9ydWxlcy5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvYWxwaGEuanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2FscGhhX2Rhc2guanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2FscGhhX251bS5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvYXJyYXkuanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2Jvb2xlYW4uanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2VtYWlsLmpzIiwiYnVpbGQvbW9kdWxlcy9ydWxlcy9lcXVhbC5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvZmFjdG9yeS5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvaW50ZWdlci5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvbnVtYmVyLmpzIiwiYnVpbGQvbW9kdWxlcy9ydWxlcy9zdHJpbmcuanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL3VybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFscGhhOiByZXF1aXJlKFwiLi9ydWxlcy9hbHBoYVwiKSxcbiAgYWxwaGFfZGFzaDogcmVxdWlyZShcIi4vcnVsZXMvYWxwaGFfZGFzaFwiKSxcbiAgYWxwaGFfbnVtOiByZXF1aXJlKFwiLi9ydWxlcy9hbHBoYV9udW1cIiksXG4gIGVtYWlsOiByZXF1aXJlKFwiLi9ydWxlcy9lbWFpbFwiKSxcbiAgZXF1YWw6IHJlcXVpcmUoXCIuL3J1bGVzL2VxdWFsXCIpLFxuICBzdHJpbmc6IHJlcXVpcmUoXCIuL3J1bGVzL3N0cmluZ1wiKSxcbiAgdXJsOiByZXF1aXJlKFwiLi9ydWxlcy91cmxcIiksXG4gIG51bWJlcjogcmVxdWlyZShcIi4vcnVsZXMvbnVtYmVyXCIpLFxuICBib29sZWFuOiByZXF1aXJlKFwiLi9ydWxlcy9ib29sZWFuXCIpLFxuICBhcnJheTogcmVxdWlyZShcIi4vcnVsZXMvYXJyYXlcIiksXG4gIGludGVnZXI6IHJlcXVpcmUoXCIuL3J1bGVzL2ludGVnZXJcIiksXG4gIGZhY3Rvcnk6IHJlcXVpcmUoXCIuL3J1bGVzL2ZhY3RvcnlcIilcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCBzdWNjZXNzLCBmYWlsdXJlLCBlcnJvcikge1xuICBpZiAoL15bYS16QS1aXSskLy50ZXN0KHZhbHVlKSkge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfVxuICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCBjYW4gb25seSBjb250YWluIGFscGhhIGNoYXJhY3RlcnMuXCI7XG4gIGZhaWx1cmUoZXJyb3IpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHN1Y2Nlc3MsIGZhaWx1cmUsIGVycm9yKSB7XG4gIGlmICgvXlthLXpBLVowLTlfXFwtXSskLy50ZXN0KHZhbHVlKSkge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfVxuICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCBjYW4gb25seSBjb250YWluIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLCBkYXNoZXMgb3IgdW5kZXJzY29yZXMuXCI7XG4gIGZhaWx1cmUoZXJyb3IpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHN1Y2Nlc3MsIGZhaWx1cmUsIGVycm9yKSB7XG4gIGlmICgvXlthLXpBLVowLTldKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgc3VjY2VzcygpO1xuICB9XG4gIGVycm9yID0gdHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJyA/IGVycm9yIDogXCJUaGUgOmZpZWxkIG11c3QgYmUgYWxwaGFudW1lcmljLlwiO1xuICBmYWlsdXJlKGVycm9yKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXkoYXJyLCBzdWNjZXNzLCBmYWlsdXJlLCBlcnJvcikge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfSBlbHNlIHtcbiAgICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCBpcyBub3QgYW4gYXJyYXkuXCI7XG4gICAgZmFpbHVyZShlcnJvcik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYm9vbGVhbihib29sLCBzdWNjZXNzLCBmYWlsdXJlLCBlcnJvcikge1xuICBpZiAodHlwZW9mIGJvb2wgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgc3VjY2VzcygpO1xuICB9XG4gIGVycm9yID0gdHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJyA/IGVycm9yIDogXCJUaGUgOmZpZWxkIGlzIG5vdCBhIGJvb2xlYW4uXCI7XG4gIGZhaWx1cmUoZXJyb3IpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZW1haWwsIHN1Y2Nlc3MsIGZhaWx1cmUsIGVycm9yKSB7XG4gIHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICBpZiAocmUudGVzdChlbWFpbCkpIHtcbiAgICBzdWNjZXNzKCk7XG4gIH1cbiAgZXJyb3IgPSB0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnID8gZXJyb3IgOiBcIlRoZSA6ZmllbGQgaXMgbm90IGEgdmFsaWQgZW1haWwuXCI7XG4gIGZhaWx1cmUoZXJyb3IpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoanVkZ2VtZW50LCBzdWNjZXNzLCBmYWlsdXJlLCBlcnJvcikge1xuICBpZiAoanVkZ2VtZW50WzBdID09IGp1ZGdlbWVudFsxXSkge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfVxuICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCdzIHZhbHVlIGlzIG5vdCBlcXVhbCB0byBnaXZlbiBjb25maXJtYXRpb24uXCI7XG4gIGZhaWx1cmUoZXJyb3IpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocnVsZSwgZXJyb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgIHJ1bGUodmFsdWUsIHN1Y2Nlc3MsIGZhaWx1cmUsIGVycm9yKTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW50ZWdlcihpbnQsIHN1Y2Nlc3MsIGZhaWx1cmUsIGVycm9yKSB7XG4gIGlmICh0eXBlb2YgaW50ID09PSBcIm51bWJlclwiICYmIC9eXFxkKyQvLnRlc3QoaW50ICsgXCJcIikpIHtcbiAgICBzdWNjZXNzKCk7XG4gIH1cbiAgZXJyb3IgPSB0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnID8gZXJyb3IgOiBcIlRoZSA6ZmllbGQgaXMgbm90IGFuIGludGVnZXIuXCI7XG4gIGZhaWx1cmUoZXJyb3IpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtaW4sIG1heCwgZXJyb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChudW0sIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICBpZiAodHlwZW9mIG51bSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgZXJyb3IgPSB0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnID8gZXJyb3IgOiBcIlRoZSA6ZmllbGQgbXVzdCBiZSBhIG51bWJlci5cIjtcbiAgICAgIGZhaWx1cmUoZXJyb3IpO1xuICAgIH1cbiAgICB2YXIgbWluVHlwZSA9IHR5cGVvZiBtaW4gPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihtaW4pLFxuICAgICAgICBtYXhUeXBlID0gdHlwZW9mIG1heCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG1heCk7XG4gICAgaWYgKG1pblR5cGUgPT09IFwibnVtYmVyXCIgJiYgbWF4VHlwZSA9PT0gXCJudW1iZXJcIiAmJiAobnVtIDwgbWluIHx8IG51bSA+IG1heCkpIHtcbiAgICAgIGVycm9yID0gdHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJyA/IGVycm9yIDogXCJUaGUgOmZpZWxkJ3MgbXVzdCBiZSBiZXR3ZWVuIFwiICsgbWluICsgXCIgYW5kIFwiICsgbWF4ICsgXCIuXCI7XG4gICAgICBmYWlsdXJlKGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKG1pblR5cGUgPT09IFwibnVtYmVyXCIgJiYgbnVtIDwgbWluKSB7XG4gICAgICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCdzIG11c3QgYmUgYXQgbGVhc3QgXCIgKyBtaW4gKyBcIi5cIjtcbiAgICAgIGZhaWx1cmUoZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAobWF4VHlwZSA9PT0gXCJudW1iZXJcIiAmJiBudW0gPiBtYXgpIHtcbiAgICAgIGVycm9yID0gdHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJyA/IGVycm9yIDogXCJUaGUgOmZpZWxkJ3MgbWF5IG5vdCBiZSBncmVhdGVyIHRoYW4gXCIgKyBtYXggKyBcIi5cIjtcbiAgICAgIGZhaWx1cmUoZXJyb3IpO1xuICAgIH1cbiAgICBzdWNjZXNzKCk7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1pbiwgbWF4LCBlcnJvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0ciwgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCBtdXN0IGJlIGEgc3RyaW5nLlwiO1xuICAgICAgZmFpbHVyZShlcnJvcik7XG4gICAgfVxuICAgIHZhciBtaW5UeXBlID0gdHlwZW9mIG1pbiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG1pbiksXG4gICAgICAgIG1heFR5cGUgPSB0eXBlb2YgbWF4ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YobWF4KSxcbiAgICAgICAgc3RyTGVuID0gc3RyLmxlbmd0aDtcbiAgICBpZiAobWluVHlwZSA9PT0gXCJudW1iZXJcIiAmJiBtYXhUeXBlID09PSBcIm51bWJlclwiICYmIChzdHJMZW4gPCBtaW4gfHwgc3RyTGVuID4gbWF4KSkge1xuICAgICAgZXJyb3IgPSB0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnID8gZXJyb3IgOiBcIlRoZSA6ZmllbGQncyBsZW5ndGggbXVzdCBiZSBiZXR3ZWVuIFwiICsgbWluICsgXCIgYW5kIFwiICsgbWF4ICsgXCIuXCI7XG4gICAgICBmYWlsdXJlKGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKG1pblR5cGUgPT09IFwibnVtYmVyXCIgJiYgc3RyTGVuIDwgbWluKSB7XG4gICAgICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCdzIGxlbmd0aCBtdXN0IGJlIGF0IGxlYXN0IFwiICsgbWluICsgXCIuXCI7XG4gICAgICBmYWlsdXJlKGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKG1heFR5cGUgPT09IFwibnVtYmVyXCIgJiYgc3RyTGVuID4gbWF4KSB7XG4gICAgICBlcnJvciA9IHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcgPyBlcnJvciA6IFwiVGhlIDpmaWVsZCdzIGxlbmd0aCBtYXkgbm90IGJlIGdyZWF0ZXIgdGhhbiBcIiArIG1heCArIFwiLlwiO1xuICAgICAgZmFpbHVyZShlcnJvcik7XG4gICAgfVxuICAgIHN1Y2Nlc3MoKTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgc3VjY2VzcywgZmFpbHVyZSwgZXJyb3IpIHtcbiAgdmFyIHJlID0gL14oZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/JC87XG4gIGlmIChyZS50ZXN0KHVybCkpIHtcbiAgICBzdWNjZXNzKCk7XG4gIH1cbiAgZXJyb3IgPSB0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnID8gZXJyb3IgOiBcIlRoZSA6ZmllbGQgaXMgbm90IGEgdXJsLlwiO1xuICBmYWlsdXJlKGVycm9yKTtcbn07Il19
