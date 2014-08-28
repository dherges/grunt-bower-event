/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';


/**
 * Default task options
 */
module.exports = {

  /**
   * Bower working directory where your ```.bowerrc``` configuration is located.
   */
  bowerDirectory: undefined,

  /**
   * Bower configuration according to its specification at
   * https://github.com/bower/config/blob/master/lib/util/defaults.js
   */
  config: null,

  /**
   * Arguments that are passed to the bower command; e.g., ```['bootstrap']``` for
   * command  ```'bower install'```. Leave blank if command does not take arguments.
   */
  arguments: undefined,

  /**
   * Argument options that are passed to the bower command; e.g.,
   * ```{"force-latest": true}``` for command ```bower install```
   */
  argumentOptions: {},

  /**
   * Bower events are namespace-prefixed with this label when they are emitted through
   * ```grunt.event```. Example: to listen for a log event ```grunt.event.on('bower.log',
   * function (data) { ... })```
   */
  eventPrefix: 'bower.'

};
