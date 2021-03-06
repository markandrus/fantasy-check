var λ = require('../check'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    options = require('fantasy-options'),
    tuples = require('fantasy-tuples'),

    assert = require("assert");

λ = λ
  .envConcat({}, combinators)
  .envConcat({}, helpers)
  .envConcat({}, tuples)
  .envConcat({}, {
      Option: options
  })
  
  .property('check', function(property, args) {
      var env = this;
      return function() {
          var report = env.forAll(property, args),
              result = report.fold(
                  function(fail) {
                      throw new Error('Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString());
                  },
                  function() {
                  }
              );
      };
  });

if (typeof module != 'undefined')
    module.exports = λ;
