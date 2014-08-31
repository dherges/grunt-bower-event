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
      task: {
        src: ['tasks/**/*.js']
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      mocha: {
        src: ['tests/mocha/**/*.js'],
        options: {
          jshintrc: 'tests/mocha/.jshintrc'
        }
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bower: {
      options: {
         bowerDirectory: "tests/fixtures"
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
      }
    },

    // Unit tests.
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/mocha/**/*.js']
      }
    },

    // Unit tests with coverage report.
    mocha_istanbul: {
      coverage: {
        src: 'tests/mocha'
      }
    },

    // Publish coverage results to coveralls.io
    coveralls: {
      mochaCoverage: {
        src: 'coverage/lcov.info'
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Here are nice alias tasks.
  grunt.registerTask('test', ['clean', 'bower', 'mocha_istanbul', 'jshint', 'coveralls']);
  grunt.registerTask('mocha', ['mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
