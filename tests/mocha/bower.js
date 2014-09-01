/*
 * grunt-bower-event
 * https://github.com/dherges/grunt-bower-event
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai')
var expect = chai.expect
var spies = require('chai-spies')

chai.use(spies)

var bowerjs = require('../../tasks/bower.js')

describe('tasks/bower.js', function () {

  it('should export a module function', function () {
    expect(bowerjs).to.be.an.instanceof(Function)
  })

  it('should call grunt.registerMultiTask()', function () {
    var spy = chai.spy()

    bowerjs({registerMultiTask: spy})
    expect(spy).to.have.been.called.once()
  })

  it('should call grunt.registerMultiTask() with "bower" task name', function () {
    var spy = chai.spy()

    bowerjs({registerMultiTask: spy})
    expect(spy).to.have.been.called.with('bower')
  })

  it('should call grunt.registerMultiTask() and register a function', function (done) {
    bowerjs({registerMultiTask: function (name, description, func) {
      expect(func).to.be.an.instanceof(Function)
      done()
    }})
  })

})
