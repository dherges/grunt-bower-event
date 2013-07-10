/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2013 David Herges
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var bower = require('bower');

  grunt.registerMultiTask('bower', 'Run bower install', function () {
    // Merge task-specific options with these defaults
    var options = this.options({});
    // Bower command is either data.command or, if that is omitted, the target name
    var command = this.data.command ? this.data.command : this.target;
    var api = bower.commands[command];
    var args = [];

    if (!api || typeof api !== 'function') {
      grunt.fail.warn(command + ' is not a bower API command.');
    }
    grunt.verbose.debug('The API function is: ' + api);

    // bower's API is usually: command([arguments: Array], {options: Object})
    if (this.data.args) {
      args.push(this.data.args);
    }
    args.push(options);
    grunt.verbose.debug('The API arguments are: ' + JSON.stringify(args));

    var done = this.async();

    // Bower programmatic API; see: https://github.com/bower/bower#programmatic-api
    api.apply(bower.commands, args)
      .on('data', function (data) {
        grunt.verbose.ok('bower callback: data');
        grunt.verbose.writeln(data);

        if (data) {
          grunt.log.notverbose.write(typeof data === 'object' ? JSON.stringify(data) : data);
        }

        // hack: https://github.com/bower/bower/issues/610
        if (command === 'list') {
          done();
        }
      })
      .on('end', function (data) {
        grunt.verbose.ok('bower callback: end');
        grunt.verbose.writeln(data);

        if (data) {
          grunt.log.notverbose.write(data);
        }

        // finish async task
        done();
      })
      .on('warn', function (warning) {
        grunt.log.warn(warning);
      })
      .on('error', function (err) {
        grunt.log.error(err);
      });
  });
};
