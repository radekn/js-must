var Must = require("../..")
var assert = require("./assert")

describe("Must.prototype.not", function() {
  it("must return an instance of Must", function() {
    assert(Must(true).not instanceof Must)
  })

  it("must carry over the current state", function() {
    assert.pass(function() { Must(false).not.equal(true) })
  })

  it("must invert condition each time", function() {
    assert.pass(function() { Must(true).not.not.equal(true) })
  })

  // TODO: Check that the previous must instance is not modified.
  it("must return a new instance of Must", function() {
    var must = Must(true)
    assert.notStrictEqual(must.not, must)
  })
})
