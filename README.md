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

Scripts for browser is under [build](https://github.com/Jimmy-YMJ/p-validator/tree/master/build) directory, use `pvalidator.js` and `rules.js` for development environment(contains inline source maps), use `pvalidator.min.js` and `rules.min.js` for production.
The references in browser is `window.PValidator` and `window.prules`.

## Problems to solve
- Suppose you have a form with more than one fields, the strategy you want to validate is:
  Validate the field and show some tip when any field element is blur or selected;
  Validate all the fields and stop the submission if something wrong is happening when the form is going to be submitted.
  And **pvalidator** provides `validate` and `validateField` respectively.

- Sometimes you may want to validate some field on the server via ajax, or with some very special rules. 
 **pvalidator** provides some common rules and a simple way to write your own `rule`s.

- Finally, you may need a flexible async validator for server side usage.

## Example
Before you use a Promise, you may need to know the difference between `promise.then(onFulfilled, onRejected)` and `promise.catch(onRejected).then(onFulfilled)`. For the first example, only one of the callbacks will be executed.
But for the second, `onFulfilled` will always be executed because the reject will be catched first.
```javascript
var Validator = require('pvalidator'),
  emailRule = require('pvalidator/rules/email'),
  alphaRule = require('pvalidator/rules/alpha'),
  stringRule = require('pvalidator/rules/string');

var fields = {
  username: 'foo',
  email: 'foo@bar.com'
};

var rules = {
  username: [stringRule(5, 25), alphaRule],
  email: emailRule
};

var errors = {
  username: '用户名不符合要求。'
};

var validator = new Validator(fields, rules, errors);
validator.validate().then(function(fields){
  // validation failed, this callback will not be executed.
}, function(errors){
  // do something with errors(the default type of errors is Array): ['用户名不符合要求。']
});

validator.validateField('email').then(function(field){
  // do something with field: 'foo@bar.com'
}, function(error){
  // validation succeed, this callback will not be executed.
});
```
## How the validator behave

When you call the **validate** method, all fields will be checked by their rules correspondingly.

For each field, the given rules will be applied one by one. If a rule validation is failed the field validation will stop and error message from customErrors or the failure rule will be recorded.

Notably, **pvalidator** provides a pseudo "empty" rule, "empty" will pass any field that is `undefined`, `null` or `""`. You can use this rule for a not required field. Usage: `var rulesForUsername = {username: ["empty", ...]}`.

## Constructor and methods

**PValidator(fields, rules, customErrors)**

| **Params** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fields  | the data you want to validate. Example: `{name: "foo"}`.| `Object` | `undefined` |
| rules  | rules for fields, the rule will be applied to field with the same key. Example: `{name: anyRule}`| `Object` | `undefined`|
| customErrors | replace the default error message from rule. Example: `{name: "the given name is not acceptable"}`| `Object` | `undefined` |

**validator.validate(options)**

| **Option** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fields | if this option is setted, it will replace the initial fields setted in constructor | `Object` | `undefined` |
| objectErrors | the default errors is returned by type of `Array`, if this option is setted, the type of errors is `Object` |`Boolean` | `false` |

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
  // validation success
}, function(error){
  // validation failed
});
```
## Rules
The **pvalidator** provides a pesudo rule named `"empty"`, if this rule is setted as the first item of rule array, the field can pass rule validation when it it empty ignoring any other rules.

rules provided by **pvalidtor**:

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
when a rule is applied to a field, the field's value will be passed as the first param, `success` and `failure` callbacks will be passed as the second and third params, anytime you want this field pass just call the `succsss` and vice versa.
the `failure` callback accepts a string param whose ":field" will be replaced with the name(key) of the field when error message is produced.

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
