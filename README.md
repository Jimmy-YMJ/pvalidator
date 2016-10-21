# pvalidator
Promise based data validator for browser and ndoejs


## Installing
```
$ npm install pvalidator
```

## Problems to solve
- Suppose you have a form with more than one fields, the strategy you want to validate is:
  Validate the field and show some tip when any field element is blur or selected;
  Validate all the fields and stop the submission if something wrong is happening when the form is going to be submitted.
  And `pvalidator` provides `validate` and `validateField` respectively.

- Sometimes you may want to validate some field on the server via ajax, or with some very special rules. 
 `pvalidator` provides some common rules and a simple way to write your own `rule`s.

- Finally, you may need a flexible async validator for server side usage.

## Example
```
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
  username: '用户名长度必须为3-25个字符，切只能包含字母。'
};

var validator = new Validator(fields, rules, errors);

validator.validate().then(function(fields){
  // do something with fields: {username: 'foo', email: 'foo@bar.com'}
}, function(errors){
     // do something with errors(the default type of errors is Array): ['用户名长度必须为3-25个字符，切只能包含字母。']
});

validator.validateField('email').then(function(field){
  // do something with field: 'foo@bar.com'
}, function(error){
     // do something with error: ''
});
```

## Constructor and methods

**PValidator(fields, rules, customErrors)**

| **Params** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fields  | the data you want to validate. Example: `{name: "foo"}`.| `Object` | `undefined` |
| rules  | the rules for fields, the rule will be applied to field with the same key. Example: `{name: anyRule}`| `Object` | `undefined`|
| customErrors | errors for field when the field validation is failed(replace the default error message from failure rule). Example: `{name: "the given name is not acceptable"}`| `Object` | `undefined` |

**validator.validate(options)**

| **Option** | **Description** | **type** | **default** |
| --- | --- | --- | --- |
| fields | if this option is setted, the __fields__ will replace the initial fields setted in constructor | `Object` | `undefined` |
| objectErrors | the default errors is returned by type of `Array`, if this option is setted, the type of errors is `Object` |
`Boolean` | `false` |

This method returns an instance of `Promise`.

Example:
```
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
```
validator.validateField("name").then(function(fieldValue){
  // validation success
}, function(error){
  // validation failed
});
```
## Rules
The **pvalidator** provides a pesudo rule named `"empty"`, if this rule is at the first place of rule array, the field can be empty.

pvalidtor provides some simple rules:

| **Rule** | **Description** |
| --- | --- |
| alpha | the target can only contains alpha characters |
| alpha_dash | the target can only contains alphanumeric characters, dashes or underscores. |
| alpha_num | the target can only contains alphanumeric characters |
| email | the target must be a email |
| equal | target[0] == target[1] |
| same | target[0] === target[1] |
| number | the target must be a number |
| string | the target must be a string |
| url | the target must be a url |

## Write your own rules
The rule used by **pvalidator** is a `function`, below is the `equal` rule:
```
function (judgement, success, failure) {
  if(judgement[0] === judgement[1]){
    success();
  }
  failure("The :field's value is not same with given confirmation.");
};

```
Explaination:
when a rule is applied to a field, the field's value will be passed as the first param, `success` and `failure` callbacks will be passed as the second and third params, anytime you want this field pass just call the `succsss` and vice versa.
the `failure` callback accepts a string param whose ":field" will be replaced with the name(key) of the field when error message if produced.

Email server side validation rule example(not rigorous):
```
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
