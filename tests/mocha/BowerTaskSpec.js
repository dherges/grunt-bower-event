/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai')
var expect = chai.expect
var spies = require('chai-spies')

chai.use(spies)

var BowerTask = require('../../tasks/lib/BowerTask.js')
var defaultOptions = require('../../tasks/lib/task-options.js')

describe('BowerTask', function () {
  describe('new BowerTask', function () {
    var contextMock = {
      options: function () {
        return {abc: "xyz"}
      }
    }
    var gruntMock = {}

    it('should create an instance', function () {
      var task = new BowerTask(contextMock, gruntMock)

      expect(task).to.be.ok
      expect(task).to.be.an.instanceof(BowerTask)
    })

    it('should build options from grunt context', function () {
      var spy = chai.spy(contextMock.options)
      var task = new BowerTask({options: spy}, gruntMock)

      expect(spy).to.have.been.called.once()
    })

    it('should build options by providing default options', function () {
      var spy = chai.spy(contextMock.options)
      var task = new BowerTask({options: spy}, gruntMock)

      expect(spy).to.have.been.called.with(defaultOptions)
    })

    it('should have options that were built through grunt context', function () {
      var task = new BowerTask(contextMock, gruntMock)

      expect(task.options).to.be.ok
      expect(task.options).to.have.property('abc', 'xyz')
    })
  })
})
