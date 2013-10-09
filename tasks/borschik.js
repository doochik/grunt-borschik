/*
 * grunt-borschik
 * https://github.com/doochik/grunt-borschik
 *
 * Copyright (c) 2013 Aleksei Androsov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('borschik', 'Build files with Borschik', function() {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var borschik = require('borschik');

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {

        options.input = filepath;
        options.output = f.dest;

        //FIXME: At this time Borschik can use strings as input or output :(

        borschik
            .api(options)
            .then(function() {
                // Print a success message.
                grunt.log.writeln('File "' + f.dest + '" created.');
                done();

            })
            .fail(function(e) {
                grunt.log.error(e);
                done(false);
            });

      });
    });
  });

};
