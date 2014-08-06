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
   * Bower working directory where your .bowerrc configuration is located
   */
  bowerDirectory: undefined,

  /**
   * Bower configuration according to https://github.com/bower/config/blob/master/lib/util/defaults.js
   */
  config: null,

  /**
   * Arguments that are passed to the bower command, e.g. ['bootstrap'] for 'bower install'; leave blank if command
   * does not take arguments.
   */
  arguments: undefined,

  /**
   * Argument options that are passed to the bower command, e.g. {"force-latest": true} for 'bower install'
   */
  argumentOptions: {},

  /**
   * Specify your custom scaffolding functions with "{log: function (data) {}, error: function (data) {}, end: function
   * (data) {})" or use a built-in scaffolder with "bloody-hell-scaffolder-name" (String)
   */
  scaffold: undefined

};
