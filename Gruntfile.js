/*
 * grunt-chimp
 * https://github.com/tyler.burton/grunt-chimp
 *
 * Copyright (c) 2015 Tyler Burton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    chimp: {
      cucumber: {
        options: {
          path: 'example/features',
          browser: 'firefox',
          // Reference: https://github.com/cucumber/cucumber/wiki/Tags
          // JSON.stringify b/c the chimp module recieves formatted strings
          // so by default we get "@iShouldrunSuccesfully,@orIshouldRunSuccesfully,@becauseIAmHere,~@iWontRun"
          // which chains together as a string and runs all of the below as an OR conditional
          tags: JSON.stringify(['@iShouldRunSuccesfully,@orIShouldRunSuccesfully', '@becauseIAmHere', '~@iWontRun'])
        }
      },
      mocha: {
        options: {
          mocha: true,
          path: 'example/specs',
          browser: 'firefox'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
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
  grunt.registerTask('test', ['clean', 'chimp:cucumber', 'nodeunit']);
  grunt.registerTask('test:mocha', ['clean', 'chimp:mocha', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
