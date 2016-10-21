# pvalidator
Promise based data validator for browser and ndoejs


## Installing
```
$ npm install pvalidator
```

## Problems to solve
Suppose you have a form with more than one fields, the strategy you want to validate is:
- validate the field and show some tip when any field element is blur or selected
- validate all the fields and stop the submission if something wrong is happening when the form is going to be submitted

`pvalidator` provides `validate` and `vlaidateField` respectively.

Further more, sometimes you may want to validate some field on the server via ajax, or with some very special rules. 
`pvalidator` provides some common rules and a flexible and simple way to write your own `rule`s.

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

var validator = new Validator(fields, ruels, errors);

validator.validate().then(function(fields){
  // do something with fields: {username: 'foo', email: 'foo@bar.com'}
}).catch(function(errors){
  // do something with errors(the default type of errors is Array): ['用户名长度必须为3-25个字符，切只能包含字母。']
})

validator.validateField('email').then(function(field){
  // do something with field: 'foo@bar.com'
}).catch(function(error){
  // do something with error: ''
});
```
