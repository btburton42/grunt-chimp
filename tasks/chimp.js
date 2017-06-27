/*
 * grunt-chimp
 * https://github.com/tyler.burton/grunt-chimp
 *
 * Copyright (c) 2015 Tyler Burton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var spawn = require('child_process').spawn;

  /**
   * Simple check to see if the input is a json type
   * @param str
   * @returns {boolean}
   */
  var isJSON = function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('chimp', 'A grunt plugin for interacting with the Chimp BDD library', function() {
    // Make this task async
    var done = this.async();
    var options = this.options();
    var chimpExecutable = '/node_modules/.bin/chimp';
    if (process.platform === 'win32') {
        chimpExecutable += '.cmd';
    }

    var chimpBin = path.resolve(process.cwd() + chimpExecutable);
    var args = [];

    for (var option in options) {
      if (isJSON(options[option])) {
        var parsedOptions = JSON.parse(options[option]);
        // If the option that was passed in was an array, we want to treat each argument seperately
        // eg, for tags we want --tags=@tagname --tags=@tagname2; not: --tags=@tagname,@tagname2
        // (cucumber cares -- https://github.com/cucumber/cucumber/wiki/Tags )
        if(Array.isArray(parsedOptions)) {
          parsedOptions.forEach((parsedOption) => args.push('--' + option + '=' + parsedOption));
        }
        else {
          args.push('--' + option + '=' + options[option]);
        }
      }
      else {
        args.push('--' + option + '=' + options[option]);
      }
    }

    var chimp = spawn(chimpBin, args);
    chimp.stdout.on('data', function(data) {
      process.stdout.write(data.toString());
    });

    chimp.stderr.pipe(process.stdout);

    chimp.on('exit', function(code) {
      if (code === 0) {
        done(true);
      } else {
        done(false);
      }
    });

    chimp.on('close', function(code) {
      if (code === 0) {
        done(true);
      } else {
        done(false);
      }
    });

  });

};
