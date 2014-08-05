/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';


var defaultOptions = {
  // Bower working directory where your .bowerrc configuration is located
  bowerDirectory: undefined,
  // Bower configuration according to https://github.com/bower/config/blob/master/lib/util/defaults.js
  config: null,
  // Arguments that are passed to the bower command, e.g. ['bootstrap'] for 'bower install'; leave blank if command does not take arguments
  arguments: undefined,
  // Argument options that are passed to the bower command, e.g. {"force-latest": true} for 'bower install'
  argumentOptions: {},
  converter: './converter/content-xml',
};

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
}


Task.prototype.run = function() {
  var done = this.context.async();

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

  var grunt = this.grunt;
  var endFunction = function (data) {
    grunt.log.ok(JSON.stringify(data));
    grunt.log.oklns("Bower command '" + command + "' finished.");
    done();
  }
  var logFunction = function (data) {
    grunt.log.write("log");
    grunt.log.writelns(JSON.stringify(data));
  }
  var errorFunction = function (err) {
    grunt.log.error("error");
    grunt.log.errorlns(err);
  }

  // 4) Run bower
  if (config.interactive) {
    cmd.apply(bower.commands, args)
      .on('log', logFunction)
      .on('error', errorFunction)
      .on('end', endFunction) 
      .on('prompt', function (prompts, callback) {
        inquirer.prompt(prompts, callback);
      });
  } else {
    cmd.apply(bower.commands, args)
      .on('log', logFunction)
      .on('error', errorFunction)
      .on('end', endFunction) 
  }

/*
    // 3a) read the list.json
    var packages = readJSON('bower_list.json');

    // 3b) generate AEM files
    var converter = require(options.converter); // converter should be an option

    for (var pkgName in packages) {
      var pkg = packages[pkgName];

      converter.generateCqClientLibaryFolder(pkg);
    }

    console.log(converter);
*/
}

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
}

module.exports = Task;
