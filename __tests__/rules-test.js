"use strict";

const PromiseValidator = require("../build/pvalidator.min");

function testRule(fields, rules, expectErrors) {
  return () => {
    return new PromiseValidator(fields, rules)
      .validate({objectErrors: true})
      .then(results => expect(results).toEqual(fields))
      .catch(errors => expect(errors).toEqual(expectErrors));
  };
}

const rules = require('../build/rules.min');


/**
 * alpha rule test
 * */
const alphaFields = {
  field1: "foo",
  field2: "foo1"
};
const alphaRules = {
  field1: rules.alpha,
  field2: rules.alpha
};
const alphaErrors = {
  field2: "The field2 can only contain alpha characters."
};

it("alpha rule test", testRule(alphaFields, alphaRules, alphaErrors));

/**
 * alpha_dash rule test
 * */
const alphaDashFields = {
  field1: "foo1-_",
  field2: "@foo1-_"
};

const alphaDashRules = {
  field1: rules.alpha_dash,
  field2: rules.alpha_dash
};

const alphaDashErrors = {
  field2: "The field2 can only contain alphanumeric characters, dashes or underscores."
};

it("alpha_dash rule test", testRule(alphaDashFields, alphaDashRules, alphaDashErrors));

/**
 * alpha_num rule test
 * */

const alphaNumFields = {
  field1: "foo123",
  field2: "foo_"
};
const alphaNumRules = {
  field1: rules.alpha_num,
  field2: rules.alpha_num
};
const alphaNumErrors = {
  field2: "The field2 must be alphanumeric."
};

it("alpha_num rule test", testRule(alphaNumFields, alphaNumRules, alphaNumErrors));

/**
 * email rule test
 * */

const emailFields = {
  field1: "foo@gmail.com",
  field2: "123@gmail123.com",
  field3: "bar@foo",
  field4: "foo"
};
const emailRules = {
  field1: rules.email,
  field2: rules.email,
  field3: rules.email,
  field4: rules.email
};
const emailErrors = {
  field3: "The field3 is not a valid email.",
  field4: "The field4 is not a valid email."
};

it("email rule test", testRule(emailFields, emailRules, emailErrors));

/**
 * equal rule test
 * */

const equalFields = {
  field1: ["foo", "foo"],
  field2: ["foo", "bar"]
};
const equalRules = {
  field1: rules.equal,
  field2: rules.equal
};
const equalErrors = {
  field2: "The field2's value is not equal to given confirmation."
};

it("equal rule test", testRule(equalFields, equalRules, equalErrors));


/**
 * url rule test
 * */

const urlFields = {
  field1: "http://localhost:3000",
  field2: "http://foo.com",
  field3: "http://foo.bar.com",
  field4: "http://foo.bar.com/?foo=bar",
  field5: "foo"
};
const urlRules = {
  field1: rules.url,
  field2: rules.url,
  field3: rules.url,
  field4: rules.url,
  field5: rules.url
};
const urlErrors = {
  field5: "The field5 is not a url."
};

it("url rule test", testRule(urlFields, urlRules, urlErrors));

/**
 * string rule test
 * */
const stringFields = {
  field1: "foo",
  field2: "foo",
  field3: "foo",
  field4: "foo",
  field5: "foo",
  field6: []
};
const stringRules = {
  field1: rules.string(2, 5),
  field2: rules.string(1, null),
  field3: rules.string(),
  field4: rules.string(null, 1),
  field5: rules.string(5, null),
  field6: rules.string()
};
const stringErrors = {
  field4: "The field4's length may not be greater than 1.",
  field5: "The field5's length must be at least 5.",
  field6: "The field6 must be a string."
};

it("string rule test", testRule(stringFields, stringRules, stringErrors));

/**
 * number rule test
 * */

const numberFields = {
  field1: 3,
  field2: 3,
  field3: 3,
  field4: 3,
  field5: 3,
  field6: "foo"
};
const numberRules = {
  field1: rules.number(2, 5),
  field2: rules.number(1, null),
  field3: rules.number(),
  field4: rules.number(null, 1),
  field5: rules.number(5, null),
  field6: rules.number()
};
const numberErrors = {
  field4: "The field4's may not be greater than 1.",
  field5: "The field5's must be at least 5.",
  field6: "The field6 must be a number."
};

it("number rule test", testRule(numberFields, numberRules, numberErrors));

/**
 * array rule test
 * */

const arrayFields = {
  field1: ["foo", "foo"],
  field2: {}
};
const arrayRules = {
  field1: rules.array,
  field2: rules.array
};
const arrayErrors = {
  field2: "The field2 is not an array."
};

it("array rule test", testRule(arrayFields, arrayRules, arrayErrors));


/**
 * boolean rule test
 * */

const booleanFields = {
  field1: false,
  field2: {}
};
const booleanRules = {
  field1: rules.boolean,
  field2: rules.boolean
};
const booleanErrors = {
  field2: "The field2 is not a boolean."
};

it("boolean rule test", testRule(booleanFields, booleanRules, booleanErrors));

/**
 * integer rule test
 * */

const integerFields = {
  field1: 33,
  field2: 44.5
};
const integerRules = {
  field1: rules.integer,
  field2: rules.integer
};
const integerErrors = {
  field2: "The field2 is not an integer."
};

it("integer rule test", testRule(integerFields, integerRules, integerErrors));
