/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';


var defaultOptions = require('./task-options');
var GruntLog = require('./listeners/GruntLog');

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
  } else if (command == 'install') {
    // install takes three params (endpoints, options, config)
    args.push(undefined);
  }
  args.push(this.options.argumentOptions, config);
  this.grunt.verbose.writeln("Command arguments are: " + JSON.stringify(args));

  // 4) Get the result dispatcher that will delegate event results to the listeners
  var dispatcher = this.getResultDispatcher();

  // 5) Run bower and let the dispatcher call all the listeners
  cmd.apply(bower.commands, args)
    .on('log', dispatcher.onLog)
    .on('error', dispatcher.onError)
    .on('end', dispatcher.onEnd)
    .on('prompt', dispatcher.onPrompt);
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

Task.prototype.getResultDispatcher = function () {
  var done = this.done;
  var listeners = [];

  // always add the grunt logging
  listeners.push(new GruntLog());

  if (typeof this.options.listener == typeof 'string') {
    var ListenerProto;
    try {
      ListenerProto = require('./listeners/' + this.options.listener);
    } catch (err) {
      try {
        ListenerProto = require(this.options.scaffold);
      } catch (err2) {
        this.grunt.fail.fatal('Listener ' + this.options.listener + ' not found!');
      }
    }
    listeners.push(new ListenerProto());
  } else if (typeof this.options.listener == typeof {}) {
    /* not a prototype so that users can plug-in a listener in
     * grunt.initConfig({
     * ..
     *   bower: {
     *     options: {
     *       listener: {
     *         end: function (data) {
     *           // do something with <%= grunt.templates %> or other stuff
     *         }
     *       }
     *     }
     *   }
     * ..
     * })
     */
    listeners.push(this.options.listener);
  } else if (typeof this.options.listener == typeof []) {
    // concatenate listeners
    this.options.listener.forEach(function (ListenerProto ) {
      listeners.push(new ListenerProto());
    });
  }

  return {
    'onLog': function (data) {
      listeners.forEach(function (listener) {
        listener.log && listener.log(data);
      });
    },

    'onEnd': function (data) {
      listeners.forEach(function (listener) {
        listener.end && listener.end(data);
      });

      done();
    },

    'onError': function (error) {
      listeners.forEach(function (listener) {
        listener.error && listener.error(error);
      });

      done();
    },

    'onPrompt': function (prompts, callback) {
      listeners.forEach(function (listener) {
        listener.prompt && listener.prompt(prompts, callback);
      });
    }
  };
};


module.exports = Task;
