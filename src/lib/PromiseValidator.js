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
  _initResults: function () {
    this.results = null;
    this.validatedValues = {};
  },
  _createFieldChecker: function (field, value, rule, ruleIndex) {
    return new Promise(function (resolve, reject) {
      rule(value, resolve, reject);
    }).then(function () {
      return value;
    }, function (errTemplate) {
      var err = this.customErrors[field];
      err = err ? (err instanceof Array ? err[ruleIndex] : err) : (typeof errTemplate === 'string' ? errTemplate.replace(":field", field) : errTemplate);
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
  _checkField: function (field, value, rules, isSingleFieldValidation) {
    value = typeof value === "function" ? value() : value;
    if(!(isSingleFieldValidation === true)){
      this.validatedValues[field] = value;
    }
    rules = rules instanceof Array ? rules : [rules];
    // check empty rule
    if(typeof rules[0] === "string" && PromiseValidator._canBeEmptyRules.indexOf(rules[0]) > -1 && PromiseValidator._isEmpty(value)){
      return Promise.resolve(value);
    }
    
    var result = Promise.resolve();
    rules.forEach(function (rule, ruleIndex) {
      if(typeof rule === "function"){
        result = result.then(function () {
          return this._createFieldChecker(field, value, rule, ruleIndex);
        }.bind(this));
      }
    }.bind(this));
    return result;
  },
  _setFields: function (fields) {
    if(fields){
      this.fields = fields;
      this.fieldsKey = PromiseValidator.getObjectKeys(fields);
    }
  },
  /**
   * Validate field by field name(the key of fields)
   *
   * @return {Promise}
   * */
  validateField: function (fieldName) {
    if(!this.fields[fieldName]){
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
  validate: function (options) {
    options = options || {};
    if(options.fields){
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
      if(this.results){
        reject(options.objectErrors ? this.results : PromiseValidator.resultsToArray(this.results));
      }else{
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
  if(field === undefined || field === null){
    return true;
  }
  return typeof field === "string" && field.trim().length === 0;
};

PromiseValidator.resultsToArray = function (results) {
  var arr = [];
  for(var key in results){
    if(results.hasOwnProperty(key)){
      arr.push(results[key]);
    }
  }
  return arr;
};

PromiseValidator.getObjectKeys = function (obj) {
  if(Object.keys){
    return Object.keys(obj);
  }
  var keys = [];
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      keys.push(key);
    }
  }
  return keys;
};

module.exports = PromiseValidator;
