'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bower = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  install: function(test) {
    test.expect(4);

    test.ok(grunt.file.isDir('tmp/qunit'), 'should install "qunit" to "tmp/qunit".');
    test.ok(grunt.file.isFile('tmp/qunit/bower-test.json'), 'should respect "bower-test.json" configuration file.');
    test.ok(grunt.file.isDir('tmp/underscore'), 'should install "underscore" to "tmp/underscore".');
    test.ok(grunt.file.isFile('tmp/underscore/bower-test.json'), 'should respect "bower-test.json" configuration file.');

    test.done();
  },
  command: function(test) {
    test.expect(4);

    test.ok(grunt.file.isDir('tmp/qunit'), 'should install "qunit" to "tmp/qunit".');
    test.ok(grunt.file.isFile('tmp/qunit/bower-test.json'), 'should respect "bower-test.json" configuration file.');
    test.ok(grunt.file.isDir('tmp/underscore'), 'should install "underscore" to "tmp/underscore".');
    test.ok(grunt.file.isFile('tmp/underscore/bower-test.json'), 'should respect "bower-test.json" configuration file.');

    test.done();
  },
};
