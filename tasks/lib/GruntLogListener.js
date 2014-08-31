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

var GruntLogListener = function () {
  grunt.event.on('bower.log', this.log.bind(this));
  grunt.event.on('bower.error', this.error.bind(this));
  grunt.event.on('bower.end', this.end.bind(this));
  grunt.event.on('bower.prompt', this.prompt.bind(this));
};

GruntLogListener.prototype.end = function (data) {
  grunt.log.oklns("Bower command finished.");
};

GruntLogListener.prototype.error = function (err) {
  grunt.log.errorlns(err.message);
};

GruntLogListener.prototype.log = function (data) {
  grunt.log.writelns(data.id + " >> " + data.message);

  if (data.data && data.data.picks && data.data.picks.forEach) {
    data.data.picks.forEach(function (pick, index) {
      grunt.log.writelns(
        grunt.log.wordlist(
          ['[', index, ']'],
          {separator: '', color: 'green'}
        ) + ' ' +
        grunt.log.wordlist(
          ['name=' + pick.pkgMeta.name, 'version=' + pick.pkgMeta.version],
          {separator: ', '}
        )
      );
    });
  }
};

GruntLogListener.prototype.prompt = function (prompts, callback) {
  inquirer.prompt(prompts, callback);
};


module.exports = new GruntLogListener();
