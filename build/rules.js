(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.prules = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {
  alpha: require("./rules/alpha"),
  alpha_dash: require("./rules/alpha_dash"),
  alpha_num: require("./rules/alpha_num"),
  email: require("./rules/email"),
  equal: require("./rules/equal"),
  string: require("./rules/string"),
  url: require("./rules/url"),
  number: require("./rules/number")
};
},{"./rules/alpha":2,"./rules/alpha_dash":3,"./rules/alpha_num":4,"./rules/email":5,"./rules/equal":6,"./rules/number":7,"./rules/string":8,"./rules/url":9}],2:[function(require,module,exports){
"use strict";

module.exports = function (value, success, failure) {
  if (/^[a-zA-Z]+$/.test(value)) {
    success();
  }
  failure("The :field can only contain alpha characters.");
};
},{}],3:[function(require,module,exports){
"use strict";

module.exports = function (value, success, failure) {
  if (/^[a-zA-Z0-9_\-]+$/.test(value)) {
    success();
  }
  failure("The :field can only contain alphanumeric characters, dashes or underscores.");
};
},{}],4:[function(require,module,exports){
"use strict";

module.exports = function (value, success, failure) {
  if (/^[a-zA-Z0-9]+$/.test(value)) {
    success();
  }
  failure("The :field must be alphanumeric.");
};
},{}],5:[function(require,module,exports){
"use strict";

module.exports = function (email, success, failure) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(email) ? success() : failure("The :field is not a valid email.");
};
},{}],6:[function(require,module,exports){
"use strict";

module.exports = function (judgement, success, failure) {
  if (judgement[0] == judgement[1]) {
    success();
  }
  failure("The :field's value is not equal to given confirmation.");
};
},{}],7:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (min, max) {
  return function (num, success, failure) {
    if (typeof num !== "number") {
      failure("The :field must be a number.");
    }
    var minType = typeof min === "undefined" ? "undefined" : _typeof(min),
        maxType = typeof max === "undefined" ? "undefined" : _typeof(max);
    if (minType === "number" && maxType === "number" && (num < min || num > max)) {
      failure("The :field's must be between " + min + " and " + max + ".");
    } else if (minType === "number" && num < min) {
      failure("The :field's must be at least " + min + ".");
    } else if (maxType === "number" && num > max) {
      failure("The :field's may not be greater than " + max + ".");
    }
    success();
  };
};
},{}],8:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (min, max) {
  return function (str, success, failure) {
    if (typeof str !== "string") {
      failure("The :field must be a string.");
    }
    var minType = typeof min === "undefined" ? "undefined" : _typeof(min),
        maxType = typeof max === "undefined" ? "undefined" : _typeof(max),
        strLen = str.length;
    if (minType === "number" && maxType === "number" && (strLen < min || strLen > max)) {
      failure("The :field's length must be between " + min + " and " + max + ".");
    } else if (minType === "number" && strLen < min) {
      failure("The :field's length must be at least " + min + ".");
    } else if (maxType === "number" && strLen > max) {
      failure("The :field's length may not be greater than " + max + ".");
    }
    success();
  };
};
},{}],9:[function(require,module,exports){
"use strict";

module.exports = function (url, success, failure) {
  var re = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  if (re.test(url)) {
    success();
  }
  failure("The :field is not a url.");
};
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8uNi4wLjFAYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnVpbGQvbW9kdWxlcy9ydWxlcy5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvYWxwaGEuanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2FscGhhX2Rhc2guanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2FscGhhX251bS5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvZW1haWwuanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL2VxdWFsLmpzIiwiYnVpbGQvbW9kdWxlcy9ydWxlcy9udW1iZXIuanMiLCJidWlsZC9tb2R1bGVzL3J1bGVzL3N0cmluZy5qcyIsImJ1aWxkL21vZHVsZXMvcnVsZXMvdXJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFscGhhOiByZXF1aXJlKFwiLi9ydWxlcy9hbHBoYVwiKSxcbiAgYWxwaGFfZGFzaDogcmVxdWlyZShcIi4vcnVsZXMvYWxwaGFfZGFzaFwiKSxcbiAgYWxwaGFfbnVtOiByZXF1aXJlKFwiLi9ydWxlcy9hbHBoYV9udW1cIiksXG4gIGVtYWlsOiByZXF1aXJlKFwiLi9ydWxlcy9lbWFpbFwiKSxcbiAgZXF1YWw6IHJlcXVpcmUoXCIuL3J1bGVzL2VxdWFsXCIpLFxuICBzdHJpbmc6IHJlcXVpcmUoXCIuL3J1bGVzL3N0cmluZ1wiKSxcbiAgdXJsOiByZXF1aXJlKFwiLi9ydWxlcy91cmxcIiksXG4gIG51bWJlcjogcmVxdWlyZShcIi4vcnVsZXMvbnVtYmVyXCIpXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgc3VjY2VzcywgZmFpbHVyZSkge1xuICBpZiAoL15bYS16QS1aXSskLy50ZXN0KHZhbHVlKSkge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfVxuICBmYWlsdXJlKFwiVGhlIDpmaWVsZCBjYW4gb25seSBjb250YWluIGFscGhhIGNoYXJhY3RlcnMuXCIpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgaWYgKC9eW2EtekEtWjAtOV9cXC1dKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgc3VjY2VzcygpO1xuICB9XG4gIGZhaWx1cmUoXCJUaGUgOmZpZWxkIGNhbiBvbmx5IGNvbnRhaW4gYWxwaGFudW1lcmljIGNoYXJhY3RlcnMsIGRhc2hlcyBvciB1bmRlcnNjb3Jlcy5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgc3VjY2VzcywgZmFpbHVyZSkge1xuICBpZiAoL15bYS16QS1aMC05XSskLy50ZXN0KHZhbHVlKSkge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfVxuICBmYWlsdXJlKFwiVGhlIDpmaWVsZCBtdXN0IGJlIGFscGhhbnVtZXJpYy5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbWFpbCwgc3VjY2VzcywgZmFpbHVyZSkge1xuICB2YXIgcmUgPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgcmUudGVzdChlbWFpbCkgPyBzdWNjZXNzKCkgOiBmYWlsdXJlKFwiVGhlIDpmaWVsZCBpcyBub3QgYSB2YWxpZCBlbWFpbC5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChqdWRnZW1lbnQsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgaWYgKGp1ZGdlbWVudFswXSA9PSBqdWRnZW1lbnRbMV0pIHtcbiAgICBzdWNjZXNzKCk7XG4gIH1cbiAgZmFpbHVyZShcIlRoZSA6ZmllbGQncyB2YWx1ZSBpcyBub3QgZXF1YWwgdG8gZ2l2ZW4gY29uZmlybWF0aW9uLlwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChudW0sIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICBpZiAodHlwZW9mIG51bSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgZmFpbHVyZShcIlRoZSA6ZmllbGQgbXVzdCBiZSBhIG51bWJlci5cIik7XG4gICAgfVxuICAgIHZhciBtaW5UeXBlID0gdHlwZW9mIG1pbiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG1pbiksXG4gICAgICAgIG1heFR5cGUgPSB0eXBlb2YgbWF4ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YobWF4KTtcbiAgICBpZiAobWluVHlwZSA9PT0gXCJudW1iZXJcIiAmJiBtYXhUeXBlID09PSBcIm51bWJlclwiICYmIChudW0gPCBtaW4gfHwgbnVtID4gbWF4KSkge1xuICAgICAgZmFpbHVyZShcIlRoZSA6ZmllbGQncyBtdXN0IGJlIGJldHdlZW4gXCIgKyBtaW4gKyBcIiBhbmQgXCIgKyBtYXggKyBcIi5cIik7XG4gICAgfSBlbHNlIGlmIChtaW5UeXBlID09PSBcIm51bWJlclwiICYmIG51bSA8IG1pbikge1xuICAgICAgZmFpbHVyZShcIlRoZSA6ZmllbGQncyBtdXN0IGJlIGF0IGxlYXN0IFwiICsgbWluICsgXCIuXCIpO1xuICAgIH0gZWxzZSBpZiAobWF4VHlwZSA9PT0gXCJudW1iZXJcIiAmJiBudW0gPiBtYXgpIHtcbiAgICAgIGZhaWx1cmUoXCJUaGUgOmZpZWxkJ3MgbWF5IG5vdCBiZSBncmVhdGVyIHRoYW4gXCIgKyBtYXggKyBcIi5cIik7XG4gICAgfVxuICAgIHN1Y2Nlc3MoKTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHIsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgZmFpbHVyZShcIlRoZSA6ZmllbGQgbXVzdCBiZSBhIHN0cmluZy5cIik7XG4gICAgfVxuICAgIHZhciBtaW5UeXBlID0gdHlwZW9mIG1pbiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG1pbiksXG4gICAgICAgIG1heFR5cGUgPSB0eXBlb2YgbWF4ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YobWF4KSxcbiAgICAgICAgc3RyTGVuID0gc3RyLmxlbmd0aDtcbiAgICBpZiAobWluVHlwZSA9PT0gXCJudW1iZXJcIiAmJiBtYXhUeXBlID09PSBcIm51bWJlclwiICYmIChzdHJMZW4gPCBtaW4gfHwgc3RyTGVuID4gbWF4KSkge1xuICAgICAgZmFpbHVyZShcIlRoZSA6ZmllbGQncyBsZW5ndGggbXVzdCBiZSBiZXR3ZWVuIFwiICsgbWluICsgXCIgYW5kIFwiICsgbWF4ICsgXCIuXCIpO1xuICAgIH0gZWxzZSBpZiAobWluVHlwZSA9PT0gXCJudW1iZXJcIiAmJiBzdHJMZW4gPCBtaW4pIHtcbiAgICAgIGZhaWx1cmUoXCJUaGUgOmZpZWxkJ3MgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgXCIgKyBtaW4gKyBcIi5cIik7XG4gICAgfSBlbHNlIGlmIChtYXhUeXBlID09PSBcIm51bWJlclwiICYmIHN0ckxlbiA+IG1heCkge1xuICAgICAgZmFpbHVyZShcIlRoZSA6ZmllbGQncyBsZW5ndGggbWF5IG5vdCBiZSBncmVhdGVyIHRoYW4gXCIgKyBtYXggKyBcIi5cIik7XG4gICAgfVxuICAgIHN1Y2Nlc3MoKTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgc3VjY2VzcywgZmFpbHVyZSkge1xuICB2YXIgcmUgPSAvXihmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8kLztcbiAgaWYgKHJlLnRlc3QodXJsKSkge1xuICAgIHN1Y2Nlc3MoKTtcbiAgfVxuICBmYWlsdXJlKFwiVGhlIDpmaWVsZCBpcyBub3QgYSB1cmwuXCIpO1xufTsiXX0=
