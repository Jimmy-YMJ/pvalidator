const PromiseValidator = require("../src/PromiseValidator");
const string = require("../src/rules/string");

const emptyFields = {
  field1: "",
  field2: "foo",
  field3: ""
};

const emptyFieldsRules = {
  field1: ["empty", string(5)],
  field2: ["empty", string(5)],
  field3: [string(5), "empty"]
};

const emptyFieldsErrors = {
  field2: "The field2's length must be at least 5.",
  field3: "The field3's length must be at least 5."
};

const fields = {
  field1: "foo and bar",
  field2: function () {
    return "foo and bar";
  }
};

const validatedFields = {
  field1: "foo and bar",
  field2: "foo and bar"
};

const successRules = {
  field1: string(3),
  field2: string(3)
};

const multiSuccessRules = {
  field1: [string(3), string(null, 25)],
  field2: [string(3), string(null, 25)]
};

const failureRules = {
  field1: string(25),
  field2: string(25)
};

const multiFailureRules = {
  field1: [string(null, 5), string(25)],
  field2: [string(null, 25), string(null, 5)]
};

// errors
const failureRulesErrors = {
  field1: "The field1's length must be at least 25.",
  field2: "The field2's length must be at least 25."
};

const multiFailureRulesErrors = {
  field1: "The field1's length may not be greater than 5.",
  field2: "The field2's length may not be greater than 5."
};

// custom errors

const customErrors = {
  field1: "The field1 is not a valid string.",
  field2: "The field2's length is not allowed."
};

const multiCustomErrors = {
  field1: ["The field1 is not a valid string.", "bar."],
  field2: ["foo.", "bar."]
};

it("validate with pseudo 'empty' rule", () => {
  return new PromiseValidator(emptyFields, emptyFieldsRules)
    .validate({objectErrors: true})
    .then(fields => expect(fields).toEqual(emptyFields))
    .catch(errors => expect(errors).toEqual(emptyFieldsErrors));
});


it("validate with successRules", () => {
  return new PromiseValidator(fields, successRules)
    .validate()
    .then(fields => expect(fields).toEqual(validatedFields))
    .catch(errors => expect(errors).toBe(null));
});

it("validate with multiSuccessRules", () => {
  return new PromiseValidator(fields, multiSuccessRules)
    .validate()
    .then(fields => expect(fields).toEqual(validatedFields))
    .catch(errors => expect(errors).toBe(null));
});


it("validate with failureRules", () => {
  return new PromiseValidator(fields, failureRules)
    .validate({objectErrors: true})
    .then(fields => expect(fields).toEqual(validatedFields))
    .catch(errors => expect(errors).toEqual(failureRulesErrors));
});

it("validate with multiFailureRules", () => {
  return new PromiseValidator(fields, multiFailureRules)
    .validate({objectErrors: true})
    .then(fields => expect(fields).toEqual(validatedFields))
    .catch(errors => expect(errors).toEqual(multiFailureRulesErrors));
});

it("validate with customErrors", () => {
  return new PromiseValidator(fields, failureRules, customErrors)
    .validate({objectErrors: true})
    .then(fields => expect(fields).toEqual(validatedFields))
    .catch(errors => expect(errors).toEqual(customErrors));
});

it("validate with multiCustomErrors", () => {
  return new PromiseValidator(fields, multiFailureRules, multiCustomErrors)
    .validate({objectErrors: true})
    .then(fields => expect(fields).toEqual(validatedFields))
    .catch(errors => expect(errors).toEqual({
      field1: "The field1 is not a valid string.",
      field2: "bar."
    }))
});

it("validateField success", () => {
  return new PromiseValidator(fields, successRules)
    .validateField("field1")
    .then(field1 => expect(field1).toBe(fields.field1))
    .catch(errors => expect(errors).toBe(null));
});

it("validateField failure", () => {
  return new PromiseValidator(fields, failureRules)
    .validateField("field1")
    .then(field1 => expect(field1).toBe(fields.field1))
    .catch(err => expect(err).toBe(failureRulesErrors.field1))
});
