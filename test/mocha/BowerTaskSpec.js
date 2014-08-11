var chai = require("chai")
var expect = chai.expect
var BowerTask = require("../../tasks/lib/BowerTask.js")

describe('BowerTask', function(){
  describe('new BowerTask', function(){
    it('should be instantiated', function(){
      expect(new BowerTask).not.to.be.null()
    })
  })
})
