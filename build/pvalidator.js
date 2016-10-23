(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PValidator = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * PromiseValidator constructor
 *
 * @param {object} fields
 * @param {object} rules
 * @param {object} customErrors
 */
function PromiseValidator(fields, rules, customErrors) {
  this._setFields(fields);
  this.rules = rules;
  this.customErrors = customErrors || {};
  this.results = null;
  this.validatedValues = {};
}

PromiseValidator.prototype = {
  /**
   * Initiate validation results every time the "validate" method is called
   */
  _initResults: function _initResults() {
    this.results = null;
    this.validatedValues = {};
  },
  _createFieldChecker: function _createFieldChecker(field, value, rule, ruleIndex) {
    return new Promise(function (resolve, reject) {
      rule(value, resolve, reject);
    }).then(function () {
      return value;
    }, function (errTemplate) {
      var err = this.customErrors[field];
      err = err ? err instanceof Array ? err[ruleIndex] : err : errTemplate.replace(":field", field);
      this.results = this.results || {};
      this.results[field] = err;
      return Promise.reject(err);
    }.bind(this));
  },
  /**
   * Check the field with given rules, validation should stop once a rule is not match
   *
   * @return {Promise}
   * */
  _checkField: function _checkField(field, value, rules, isSingleFieldValidation) {
    value = typeof value === "function" ? value() : value;
    if (!(isSingleFieldValidation === true)) {
      this.validatedValues[field] = value;
    }
    rules = rules instanceof Array ? rules : [rules];
    // check empty rule
    if (typeof rules[0] === "string" && PromiseValidator._canBeEmptyRules.indexOf(rules[0]) > -1 && PromiseValidator._isEmpty(value)) {
      return Promise.resolve(value);
    }

    var result = Promise.resolve();
    rules.forEach(function (rule, ruleIndex) {
      if (typeof rule === "function") {
        result = result.then(function () {
          return this._createFieldChecker(field, value, rule, ruleIndex);
        }.bind(this));
      }
    }.bind(this));
    return result;
  },
  _setFields: function _setFields(fields) {
    if (fields) {
      this.fields = fields;
      this.fieldsKey = PromiseValidator.getObjectKeys(fields);
    }
  },
  /**
   * Validate field by field name(the key of fields)
   *
   * @return {Promise}
   * */
  validateField: function validateField(fieldName) {
    if (!this.fields[fieldName]) {
      throw new Error("has no field named " + fieldName);
    }
    return this._checkField(fieldName, this.fields[fieldName], this.rules[fieldName], true);
  },
  /**
   * Validate all fields
   *
   * @param {object} options
   * @return {Promise}
   * */
  validate: function validate(options) {
    options = options || {};
    if (options.fields) {
      this._setFields(options.fields);
    }
    this._initResults();
    var anywayPromise = Promise.resolve();
    this.fieldsKey.forEach(function (field) {
      var checker = this._checkField(field, this.fields[field], this.rules[field]);
      anywayPromise = anywayPromise.then(function () {
        return checker;
      }, function () {
        return checker;
      });
    }.bind(this));
    var checkResult = function (resolve, reject) {
      if (this.results) {
        reject(options.objectErrors ? this.results : PromiseValidator.resultsToArray(this.results));
      } else {
        resolve(this.validatedValues);
      }
    }.bind(this);
    return new Promise(function (resolve, reject) {
      anywayPromise.then(function () {
        checkResult(resolve, reject);
      }, function () {
        checkResult(resolve, reject);
      });
    });
  }
};

/**
 * PromiseValidator provide a pseudo string rule named "canBeEmpty|empty",
 * the field with "canBeEmpty" rule applied will pass validation once the field is empty
 *  ignoring any other rules.
 * */
PromiseValidator._canBeEmptyRules = ["canBeEmpty", "empty"];

PromiseValidator._isEmpty = function (field) {
  if (field === undefined || field === null) {
    return true;
  }
  return typeof field === "string" && field.trim().length === 0;
};

PromiseValidator.resultsToArray = function (results) {
  var arr = [];
  for (var key in results) {
    if (results.hasOwnProperty(key)) {
      arr.push(results[key]);
    }
  }
  return arr;
};

PromiseValidator.getObjectKeys = function (obj) {
  if (Object.keys) {
    return Object.keys(obj);
  }
  var keys = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
};

module.exports = PromiseValidator;
},{}],2:[function(require,module,exports){
"use strict";

module.exports = require("./lib/PromiseValidator");
},{"./lib/PromiseValidator":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8uNi4wLjFAYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnVpbGQvbW9kdWxlcy9saWIvUHJvbWlzZVZhbGlkYXRvci5qcyIsImJ1aWxkL21vZHVsZXMvcHZhbGlkYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVKQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogUHJvbWlzZVZhbGlkYXRvciBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBydWxlc1xuICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbUVycm9yc1xuICovXG5mdW5jdGlvbiBQcm9taXNlVmFsaWRhdG9yKGZpZWxkcywgcnVsZXMsIGN1c3RvbUVycm9ycykge1xuICB0aGlzLl9zZXRGaWVsZHMoZmllbGRzKTtcbiAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICB0aGlzLmN1c3RvbUVycm9ycyA9IGN1c3RvbUVycm9ycyB8fCB7fTtcbiAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgdGhpcy52YWxpZGF0ZWRWYWx1ZXMgPSB7fTtcbn1cblxuUHJvbWlzZVZhbGlkYXRvci5wcm90b3R5cGUgPSB7XG4gIC8qKlxuICAgKiBJbml0aWF0ZSB2YWxpZGF0aW9uIHJlc3VsdHMgZXZlcnkgdGltZSB0aGUgXCJ2YWxpZGF0ZVwiIG1ldGhvZCBpcyBjYWxsZWRcbiAgICovXG4gIF9pbml0UmVzdWx0czogZnVuY3Rpb24gX2luaXRSZXN1bHRzKCkge1xuICAgIHRoaXMucmVzdWx0cyA9IG51bGw7XG4gICAgdGhpcy52YWxpZGF0ZWRWYWx1ZXMgPSB7fTtcbiAgfSxcbiAgX2NyZWF0ZUZpZWxkQ2hlY2tlcjogZnVuY3Rpb24gX2NyZWF0ZUZpZWxkQ2hlY2tlcihmaWVsZCwgdmFsdWUsIHJ1bGUsIHJ1bGVJbmRleCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBydWxlKHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sIGZ1bmN0aW9uIChlcnJUZW1wbGF0ZSkge1xuICAgICAgdmFyIGVyciA9IHRoaXMuY3VzdG9tRXJyb3JzW2ZpZWxkXTtcbiAgICAgIGVyciA9IGVyciA/IGVyciBpbnN0YW5jZW9mIEFycmF5ID8gZXJyW3J1bGVJbmRleF0gOiBlcnIgOiBlcnJUZW1wbGF0ZS5yZXBsYWNlKFwiOmZpZWxkXCIsIGZpZWxkKTtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHRoaXMucmVzdWx0cyB8fCB7fTtcbiAgICAgIHRoaXMucmVzdWx0c1tmaWVsZF0gPSBlcnI7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuICAvKipcbiAgICogQ2hlY2sgdGhlIGZpZWxkIHdpdGggZ2l2ZW4gcnVsZXMsIHZhbGlkYXRpb24gc2hvdWxkIHN0b3Agb25jZSBhIHJ1bGUgaXMgbm90IG1hdGNoXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqICovXG4gIF9jaGVja0ZpZWxkOiBmdW5jdGlvbiBfY2hlY2tGaWVsZChmaWVsZCwgdmFsdWUsIHJ1bGVzLCBpc1NpbmdsZUZpZWxkVmFsaWRhdGlvbikge1xuICAgIHZhbHVlID0gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyB2YWx1ZSgpIDogdmFsdWU7XG4gICAgaWYgKCEoaXNTaW5nbGVGaWVsZFZhbGlkYXRpb24gPT09IHRydWUpKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlZFZhbHVlc1tmaWVsZF0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcnVsZXMgPSBydWxlcyBpbnN0YW5jZW9mIEFycmF5ID8gcnVsZXMgOiBbcnVsZXNdO1xuICAgIC8vIGNoZWNrIGVtcHR5IHJ1bGVcbiAgICBpZiAodHlwZW9mIHJ1bGVzWzBdID09PSBcInN0cmluZ1wiICYmIFByb21pc2VWYWxpZGF0b3IuX2NhbkJlRW1wdHlSdWxlcy5pbmRleE9mKHJ1bGVzWzBdKSA+IC0xICYmIFByb21pc2VWYWxpZGF0b3IuX2lzRW1wdHkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSwgcnVsZUluZGV4KSB7XG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZpZWxkQ2hlY2tlcihmaWVsZCwgdmFsdWUsIHJ1bGUsIHJ1bGVJbmRleCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBfc2V0RmllbGRzOiBmdW5jdGlvbiBfc2V0RmllbGRzKGZpZWxkcykge1xuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgICAgdGhpcy5maWVsZHNLZXkgPSBQcm9taXNlVmFsaWRhdG9yLmdldE9iamVjdEtleXMoZmllbGRzKTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBmaWVsZCBieSBmaWVsZCBuYW1lKHRoZSBrZXkgb2YgZmllbGRzKVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKiAqL1xuICB2YWxpZGF0ZUZpZWxkOiBmdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKGZpZWxkTmFtZSkge1xuICAgIGlmICghdGhpcy5maWVsZHNbZmllbGROYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaGFzIG5vIGZpZWxkIG5hbWVkIFwiICsgZmllbGROYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrRmllbGQoZmllbGROYW1lLCB0aGlzLmZpZWxkc1tmaWVsZE5hbWVdLCB0aGlzLnJ1bGVzW2ZpZWxkTmFtZV0sIHRydWUpO1xuICB9LFxuICAvKipcbiAgICogVmFsaWRhdGUgYWxsIGZpZWxkc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKiAqL1xuICB2YWxpZGF0ZTogZnVuY3Rpb24gdmFsaWRhdGUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLmZpZWxkcykge1xuICAgICAgdGhpcy5fc2V0RmllbGRzKG9wdGlvbnMuZmllbGRzKTtcbiAgICB9XG4gICAgdGhpcy5faW5pdFJlc3VsdHMoKTtcbiAgICB2YXIgYW55d2F5UHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHRoaXMuZmllbGRzS2V5LmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IHRoaXMuX2NoZWNrRmllbGQoZmllbGQsIHRoaXMuZmllbGRzW2ZpZWxkXSwgdGhpcy5ydWxlc1tmaWVsZF0pO1xuICAgICAgYW55d2F5UHJvbWlzZSA9IGFueXdheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjaGVja2VyO1xuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2hlY2tlcjtcbiAgICAgIH0pO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdmFyIGNoZWNrUmVzdWx0ID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKHRoaXMucmVzdWx0cykge1xuICAgICAgICByZWplY3Qob3B0aW9ucy5vYmplY3RFcnJvcnMgPyB0aGlzLnJlc3VsdHMgOiBQcm9taXNlVmFsaWRhdG9yLnJlc3VsdHNUb0FycmF5KHRoaXMucmVzdWx0cykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLnZhbGlkYXRlZFZhbHVlcyk7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBhbnl3YXlQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGVja1Jlc3VsdChyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGVja1Jlc3VsdChyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogUHJvbWlzZVZhbGlkYXRvciBwcm92aWRlIGEgcHNldWRvIHN0cmluZyBydWxlIG5hbWVkIFwiY2FuQmVFbXB0eXxlbXB0eVwiLFxuICogdGhlIGZpZWxkIHdpdGggXCJjYW5CZUVtcHR5XCIgcnVsZSBhcHBsaWVkIHdpbGwgcGFzcyB2YWxpZGF0aW9uIG9uY2UgdGhlIGZpZWxkIGlzIGVtcHR5XG4gKiAgaWdub3JpbmcgYW55IG90aGVyIHJ1bGVzLlxuICogKi9cblByb21pc2VWYWxpZGF0b3IuX2NhbkJlRW1wdHlSdWxlcyA9IFtcImNhbkJlRW1wdHlcIiwgXCJlbXB0eVwiXTtcblxuUHJvbWlzZVZhbGlkYXRvci5faXNFbXB0eSA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICBpZiAoZmllbGQgPT09IHVuZGVmaW5lZCB8fCBmaWVsZCA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgZmllbGQgPT09IFwic3RyaW5nXCIgJiYgZmllbGQudHJpbSgpLmxlbmd0aCA9PT0gMDtcbn07XG5cblByb21pc2VWYWxpZGF0b3IucmVzdWx0c1RvQXJyYXkgPSBmdW5jdGlvbiAocmVzdWx0cykge1xuICB2YXIgYXJyID0gW107XG4gIGZvciAodmFyIGtleSBpbiByZXN1bHRzKSB7XG4gICAgaWYgKHJlc3VsdHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgYXJyLnB1c2gocmVzdWx0c1trZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cblByb21pc2VWYWxpZGF0b3IuZ2V0T2JqZWN0S2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gIH1cbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlVmFsaWRhdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9Qcm9taXNlVmFsaWRhdG9yXCIpOyJdfQ==
