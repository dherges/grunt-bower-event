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
console.log("GruntLog inited");
  grunt.event.on('bower.log', this.log.bind(this))
  grunt.event.on('bower.error', this.error.bind(this))
  grunt.event.on('bower.end', this.end.bind(this))
  grunt.event.on('bower.prompt', this.prompt.bind(this))
};

GruntLog.prototype.end = function (data) {
  grunt.log.oklns("Bower command finished.");
};

GruntLog.prototype.error = function (err) {
  grunt.log.errorlns(err.message);
};

GruntLog.prototype.log = function (data) {
console.log(grunt.event);
console.log(this)
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
