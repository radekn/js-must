var Must = require("../..")
var assert = require("./assert")

module.exports = function(name, truthy) {
  // Allow using new Boolean:
  /* jshint -W053 */
  var pass = truthy ? "pass" : "fail"
  var fail = truthy ? "fail" : "pass"
  var throws = truthy ? assert.fail : assert.pass
  var doesNotThrow = truthy ? assert.pass : assert.fail

  it("must "+pass+" given true literal", function() {
    doesNotThrow(function() { Must(true).be[name]() })
  })

  it("must "+pass+" given true object", function() {
    doesNotThrow(function() { Must(new Boolean(true)).be[name]() })
  })

  it("must "+fail+" given false literal", function() {
    throws(function() { Must(false).be[name]() })
  })

  it("must "+fail+" given false object", function() {
    throws(function() { Must(new Boolean(false)).be[name]() })
  })

  it("must fail gracefully if null", function() {
    assert.fail(function() { Must(null).be[name]() })
  })

  it("must fail gracefully if undefined", function() {
    assert.fail(function() { Must(undefined).be[name]() })
  })

  it("must fail given zero number literal", function() {
    assert.fail(function() { Must(0).be[name]() })
  })

  it("must fail given an empty string", function() {
    assert.fail(function() { Must("").be[name]() })
  })

  it("must not do anything when not called as a function", function() {
    assert.pass(function() { Must(!truthy).be[name] })
  })

  require("./_assertion_error_test")(function() { Must(!truthy).be[name]() }, {
    actual: !truthy,
    expected: truthy,
    message: !truthy + " must be " + truthy
  })

  describe(".not", function() {
    function not() { Must(truthy).not.be[name]() }

    it("must invert the assertion", function() {
      assert.fail(not)
    })

    require("./_assertion_error_test")(not, {
      actual: truthy,
      expected: truthy,
      message: truthy + " must not be " + truthy
    })
  })
}
