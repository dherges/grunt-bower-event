/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');


/**
 * Default scaffolding that simply logs received data to grunt.log
 */
module.exports = {

  end: function (data) {
    grunt.log.ok(JSON.stringify(data));
    grunt.log.oklns("Bower command finished.");
  },

  error: function (err) {
    grunt.log.error("error");
    grunt.log.errorlns(err);
  },

  log: function (data) {
    grunt.log.write("log");
    grunt.log.writelns(JSON.stringify(data));
  }

};
