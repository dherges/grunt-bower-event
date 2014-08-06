/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';


var defaultOptions = require('./task-options');

var bower = require('bower');
var bowerConfig = require('bower-config');
var mout = require('mout');
var path = require('path');


/** 
 * Creates a new task.
 *
 * @param context Context of the task function; the 'this' you would normally refer to inside a task function
 * @param grunt Grunt object
 */
var Task = function (context, grunt) {
  this.context = context;
  this.grunt = grunt;

  // Merge task-specific and/or target-specific options with these defaults.
  this.options = context.options(defaultOptions);
};


Task.prototype.run = function() {
  this.done = this.context.async();

  // 1) Determine the Bower command that is to be executed
  var command = this.context.data.command || this.context.target;
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
  }
  args.push(this.options.argumentOptions, config);
  this.grunt.verbose.writeln("Command arguments are: " + JSON.stringify(args));

  // 4) Get the event listener functions that will do the scaffolding magic
  var scaffolders = this.getScaffoldingFunctions();

  // 5) Run bower
  if (config.interactive) {
    cmd.apply(bower.commands, args)
      .on('log', scaffolders.log)
      .on('error', scaffolders.error)
      .on('end', scaffolders.end)
      .on('prompt', function (prompts, callback) {
        inquirer.prompt(prompts, callback);
      });
  } else {
    cmd.apply(bower.commands, args)
      .on('log', scaffolders.log)
      .on('error', scaffolders.error)
      .on('end', scaffolders.end)
  }
};

Task.prototype.getConfiguration = function () {
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

Task.prototype.getScaffoldingFunctions = function () {

  var done = this.done;
  var grunt = this.grunt;

  // TODO: build the listener functions
  var callDone = function () {
    done();
  };
  var noop = function () {};


  // TODO: get the scaffolders
  var scaffold = {
    end: noop,
    error: noop,
    log: noop
  };
  if (typeof this.options.scaffold == typeof 'string') {
    scaffold = require(this.options.scaffold);
  } else if (typeof this.options.scaffold == typeof {}) {
    scaffold = this.options.scaffold;
  } else if (typeof this.options.scaffold == typeof []) {
    // TODO: can we concatenate scaffolders?
  }

  var gruntLog = require('./scaffolding/grunt-log');

  return {
    end: mout.function.series.apply(mout.function, [scaffold.end, gruntLog.end, callDone]),
    error: mout.function.series.apply(mout.function, [scaffold.error, gruntLog.error, callDone]),
    log: mout.function.series.apply(mout.function, [scaffold.log, gruntLog.log])
  };
};

module.exports = Task;
