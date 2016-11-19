# pvalidator
Promise based data validator for browser and nodejs, it is lightweight and flexible.

## Installing
Use via npm:
```bash
$ npm install pvalidator
```
```javascript
var Validator = require('pvalidator'),
    string = require('pvalidator/rules/string');

// Use es6 import
import Validator from 'pvalidator';
import { string, email } from 'pvalidator/rules';

```
Use in browser:

Scripts for browser is under [build](https://github.com/Jimmy-YMJ/pvalidator/tree/master/build) directory, use `pvalidator.js` and `rules.js` for development environment(contains inline source maps), use `pvalidator.min.js` and `rules.min.js` for production.
The references in browser is `window.PValidator` and `window.prules`.

## Problems to solve
- Suppose you have a form with more than one fields, the strategy you want to validate is:

  Validate the field and show some tip when any field element is blur or selected.
  
  Validate all the fields and stop the submission if something wrong is happening when the form is going to be submitted.
  
  The **pvalidator** provides `validateField` and `validate` respectively.

- Sometimes you may want to validate some field on the server via ajax, or with some very special rules. 
 **pvalidator** provides some common rules and a simple way to write your own `rule`s.

- Finally, you may need a flexible validator for server side usage.

## Example
Before you use a Promise, you may need to know the difference between `promise.then(onFulfilled, onRejected)` and `promise.catch(onRejected).then(onFulfilled)`. For the first, only one of the callbacks will be executed.
But for the second, `onFulfilled` will always be executed because the rejection will be caught first.
```javascript
var Validator = require('pvalidator'),
  emailRule = require('pvalidator/rules/email'),
  alphaRule = require('pvalidator/rules/alpha'),
  stringRule = require('pvalidator/rules/string');

var fields = {
  username: function(){
    return "username";
  },
  email: 'bar.com'
};

var rules = {
  username: [stringRule(5, 25), alphaRule],
  email: emailRule
};

var errors = {
  username: ['用户名的长度必须在5到25个字符之间', '用户名只能包含字母'],
  email: '邮箱格式不正确'
};

var validator = new Validator(fields, rules, errors);

validator.validate().then(function(fields){
  // This callback will not be executed.
}, function(errors){
  // Do something with errors(the default type of errors is Array): ['邮箱格式不正确'].
});

validator.validateField('username').then(function(field){
  // Do something with the field: 'username'
}, function(error){
  // This callback will not be executed.
});
```
## How the validator behave

When you call the **validate** method, all fields will be checked by their rules correspondingly.

For each field, the given rules will be applied one by one. If one rule is failed the whole field validation will stop, error message from customErrors or the failure rule will be recorded.

Notably, **pvalidator** provides a pseudo "empty" rule, "empty" will pass any field that is `undefined`, `null` or `""`. You can use this rule for a not required field. Usage: `var rulesForUsername = {username: ["empty", ...]}`.

## Constructor and methods

**PValidator(fields, rules, customErrors)**

| **Params** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fields  | The data you want to validate. Example: `{name: "foo"}` or `{name: function(){ return "foo"; }}`.| `Object` | `undefined` |
| rules  | Rules for fields, a rule will be applied to a field with the same key. Example: `{name: anyRule}`| `Object` | `undefined`|
| customErrors | Replace the default error message from rule. Example: `{name: "The given name is not acceptable"}`. If the target field has more than one rules, the custom errors can be an array which has the same order of rules. | `Object` | `undefined` |

If you want to get a field value dynamically, you can use a function as the value of that field.

**validator.validate(options)**

| **Option** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fields | If this option is provided, it will replace the initial fields provided in constructor | `Object` | `undefined` |
| objectErrors | The default errors is returned by type of `Array`, if this option is provided as `true`, the type of errors is `Object` |`Boolean` | `false` |

This method returns an instance of `Promise`.

Example:
```javascript
validator.validate({objectErrors: true}).then(function(fields){
  // validation success
}, function(errors){
  // validation failed, the type of errors is Object
});
```

**validator.validateField(fieldName)**

| **Params** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fieldName | the name(key) of the field you want to validate | `String` | `undefined` |

This method returns an instance of `Promise`.

Example:
```javascript
validator.validateField("name").then(function(fieldValue){
  // Validation success
}, function(error){
  // Validation failed
});
```
## Rules
The **pvalidator** provides a pseudo rule named `"empty"`, if this rule is provided as the first item of rule array, the target field can pass rule validation when it it empty ignoring any other rules.

Rules provided by **pvalidtor**:

| **Rule** | **Description** |
| --- | --- | --- |
| "empty" | The **"empty"** pseudo rule |
| alpha | The target can only contains alpha characters |
| alpha_dash | The target can only contains alphanumeric characters, dashes or underscores. |
| alpha_num | The target can only contains alphanumeric characters |
| email | The target must be a email |
| equal | target[0] == target[1] |
| number | The target must be a number |
| string | The target must be a string |
| url | The target must be a url |
| array | The target must be an array |
| boolean | The target must be a boolean |
| integer | The target must be an Integer |


## Write your own rules
The rule used by **pvalidator** is a `function`, below is the `equal` rule:
```javascript
function (judgement, success, failure) {
  if(judgement[0] == judgement[1]){
    success();
  }
  failure("The :field's value is not equal to given confirmation.");
};

```
Explaination:
When a rule is applied to a field, this field's value will be passed as the first param, `success` and `failure` callbacks as the second and third params, anytime you want this field pass the rule validation just call the `success` and vice versa.
The `failure` callback accepts a string param whose ":field" part will be replaced with the name(key) of the target field when error message is produced.

Email server side validation rule example(not rigorous):
```javascript
function(email, success, failure){
  jQuery.ajax({
    method: "POST",
    url: "email-exists.php",
    data: { email: email },
    success: function() {
      success();
    },
    error: function(){
      failure("The email is already exists");
    }
  });
}
```
## License
MIT

## Contribute
- Welcome Issues.
- Clone the repository -> `npm install` -> do something -> `npm run build` -> `npm run test` -> make a PR.
- To be a contributor if necessary.
