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
var BowerTask = require('../../tasks/lib/BowerTask.js')

describe('BowerTask', function(){
  describe('new BowerTask', function(){
    var contextMock = {
      options: function () {
        return {abc: "xyz"}
      }
    }
    var gruntMock = {}

    it('should be instantiated', function(){
      var task = new BowerTask(contextMock, gruntMock)

      expect(task).not.to.be.null
    })

    it('should have options that were returned from context', function(){
      var task = new BowerTask(contextMock, gruntMock)

      expect(task.options).not.to.be.null
      expect(task.options).to.have.property('abc', 'xyz')
    })
  })
})
