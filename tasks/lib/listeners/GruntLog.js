/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var inquirer = require('inquirer');

var GruntLog = function () {

};

GruntLog.prototype.end = function (data) {
  grunt.log.oklns("Bower command finished.");
};

GruntLog.prototype.error = function (err) {
  grunt.log.errorlns(err.message);
};

GruntLog.prototype.log = function (data) {
  grunt.log.writelns(data.id + " >> " + data.message);

  data.data && data.data.picks && data.data.picks.forEach(function(pick, index) {
    grunt.log.writelns(
      grunt.log.wordlist(['[', index, ']'], {separator: '', color: 'green'}) + ' ' +
      grunt.log.wordlist(['name=' + pick.pkgMeta.name, 'version=' + pick.pkgMeta.version], {separator: ', '}));
  })
};

GruntLog.prototype.prompt = function (prompts, callback) {
  inquirer.prompt(prompts, callback);
};


/**
 * Default scaffolding that simply logs received data to grunt.log
 */
module.exports = GruntLog;
