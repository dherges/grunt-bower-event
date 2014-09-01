/*
 * grunt-bower-event
 * https://github.com/dherges/grunt-bower-event
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';


var defaultOptions = require('./task-options');
var gruntLog = require('./GruntLogListener');

var bower = require('bower');
var bowerConfig = require('bower-config');
var mout = require('mout');
var path = require('path');

/** 
 * Creates a new task.
 *
 * @param context Task function context (='this' inside a grunt task function)
 * @param grunt Grunt object
 */
var BowerTask = function (context, grunt) {
  this.context = context;
  this.grunt = grunt;

  // Merge task-specific and/or target-specific options with these defaults.
  this.options = context.options(defaultOptions);
};


BowerTask.prototype.run = function() {
  this.done = this.context.async();

  // 1) Determine the Bower command that is to be executed
  var command = this.getBowerCommand();
  this.grunt.verbose.writeln("Running bower command: " + command);

  // 2) Read the bower configuration that will be passed to be command
  var config = this.getConfiguration();
  this.grunt.verbose.writeflags(config, "Bower Configuration");

  // 3) Get the bower command and prepare arguments
  var cmd = bower.commands[command];

  if (!cmd) {
    this.grunt.fail.warn("The bower command '" + command + "' does not exist!");
  }

  var args = [];
  if (this.options.arguments) {
    args.push(this.options.arguments);
  } else if (command === 'install') {
    // install takes three params (endpoints, options, config)
    args.push(undefined);
  }
  args.push(this.options.argumentOptions, config);
  this.grunt.verbose.writeln("Command arguments are: " + JSON.stringify(args));

  // 4) Run bower and forward events to grunt.event API
  var done = this.done;
  var grunt = this.grunt;
  var prefix = this.options.eventPrefix;
  cmd.apply(bower.commands, args)
    .on('log', function () {
      grunt.event.emit.apply(grunt.event, [prefix + 'log'].concat(Array.prototype.slice.call(arguments)));
     })
    .on('error', function () {
      grunt.event.emit.apply(grunt.event, [prefix + 'error'].concat(Array.prototype.slice.call(arguments)));
      done();
    })
    .on('end', function () {
      grunt.event.emit.apply(grunt.event, [prefix + 'end'].concat(Array.prototype.slice.call(arguments)));
      done();
    })
    .on('prompt', function () {
      grunt.event.emit.apply(grunt.event, [prefix + 'prompt'].concat(Array.prototype.slice.call(arguments)));
    });
};

BowerTask.prototype.getBowerCommand = function () {
  return this.context.data.command || this.context.target;
};

BowerTask.prototype.getConfiguration = function () {
  var config = bowerConfig.read(this.options.bowerDirectory);

  /**** Compare to https://github.com/bower/bower/blob/master/lib/config.js#L6-L24 ****/
  // Delete the json attribute because it is no longer supported
  // and conflicts with --json
  delete config.json;

  // If interactive is auto (null), guess its value
  if (config.interactive == null) {
    config.interactive = (
        process.bin === 'bower' &&
        tty.isatty(1) &&
        !process.env.CI
    );
  }

  // If `analytics` hasn't been explicitly set, we disable
  // it when ran programatically.
  if (config.analytics == null) {
    // Don't enable analytics on CI server unless explicitly configured.
    config.analytics = config.interactive;
  }

  mout.object.mixIn(config, this.options.config);

  return config;
};


module.exports = BowerTask;
