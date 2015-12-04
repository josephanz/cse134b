module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        files: [
        {
          expand: true,     // Enable dynamic expansion.
          src: ['js/**/*.js'], // Actual pattern(s) to match.
          dest: 'destination/',   // Destination path prefix.
          ext: '.js',   // Dest filepaths will have this extension.
        },
      ],
      }
    },
    minifyPolymer: {
      build: {
        files: [
        {
          expand: true,     // Enable dynamic expansion.
          src: ['src/**/*.html'], // Actual pattern(s) to match.
          dest: 'destination/',   // Destination path prefix.
          ext: '.html',   // Dest filepaths will have this extension.
        },
      ],
      }
    },
    cssmin: {
      build: {
        files: [
        {
          expand: true,     // Enable dynamic expansion.
          src: ['css/**/*.css'], // Actual pattern(s) to match.
          dest: 'destination/',   // Destination path prefix.
          ext: '.css',   // Dest filepaths will have this extension.
        },
      ],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-minify-polymer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  grunt.registerTask('default', ['concat', 'uglify', 'minifyPolymer', 'cssmin']);

};