/*
 * grunt-bower-event
 * https://github.com/dherges/grunt-bower-event
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
var fs = require('fs')

describe('fixtures for "grunt bower"', function () {

  it('must install bootstrap', function (done) {
    var path = 'tests/output/bootstrap/.bower.json'
    fs.exists(path, function (exists) {
      assert.ok(exists, path + ' must exist!')
      done()
    })
  })

  it('must install jquery', function (done) {
    var path = 'tests/output/jquery/.bower.json'
    fs.exists(path, function (exists) {
      assert.ok(exists, path + ' must exist!')
      done()
    })
  })

  it('must install typeahead.js', function (done) {
    var path = 'tests/output/typeahead.js/.bower.json'
    fs.exists(path, function (exists) {
      assert.ok(exists, path + ' must exist!')
      done()
    })
  })

})
