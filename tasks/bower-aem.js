/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  var packageJson = require('../package.json');

  // Put the function that actually executes the task in a separate file, so it becomes more 'test-able'
  var TaskFunction = require('./lib/task');

  grunt.registerMultiTask('bower-aem', packageJson.description, function () {
    new TaskFunction(this, grunt).run(); // looks like Java's new Runnable().run()... Oo
  });
}
