/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true
      },
      all: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'tasks/*.js', '<%= nodeunit.tests %>']
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bower: {
      options: {
         bowerDirectory: "test/fixtures"
      },
      test: {
        options: {
          config: { // A bower configuration object
            strictSsl: false
          }
        },
        command: "list" // If left empty, use the target name
      },
      install: {
        options: {
          config: {
            interactive: true
          }
        }
      },
      aemClientLibraries: {
        options: {
          listener: 'AemClientLibraries'
        },
        command: "list"
      },
      customListener: {
        options: {
          listener: {
            log: function () {
              grunt.log.oklns("My Custom Listener logs!");
            },
            end: function (data) {
              grunt.log.oklns("My Custom Listener received the end event: " + data);
            }
          }
        },
        command: "list"
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // TODO: write a nice test task
  grunt.registerTask('test', ['clean', 'bower']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
