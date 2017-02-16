module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      theme:       ['build/wp-content/themes/moddest/**'],
      source_less: ['source/components/components-styles/collected-styles/**'],
      source_js:   ['source/components/components-scripts/collected-scripts/**']
    },

    concat: {
      options: {
        separator: '\n /*SeparatoR*/ \n'
      },
      themeStyles: {
        src: [
          // 'source/components/components-styles/**/*.scss',
          'source/modules/**/*.scss'
        ],
        dest: 'source/components/components-styles/collected-styles/scss/layout.scss'
      },
      homepage: {
        src: [
          'source/pages/page-head.php',
          'source/modules/modules-main/home/*.php',
          'source/pages/page-end.php'
        ],
        dest: 'build/wp-content/themes/moddest/index.php'
      }
    },

    sass: {
      dist: {
        files: {
          'source/components/components-styles/collected-styles/css/layout.css': 'source/components/components-styles/collected-styles/scss/layout.scss',
          'build/wp-content/themes/moddest/style.css': 'source/components/components-styles/collected-styles/scss/layout.scss'
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "source/images/logo-theme/screenshots",
            src: [
              'screenshot-2.png'
            ],
            dest: 'build/wp-content/themes/moddest/'
          }
        ]
      }
    },

    rename: {
      main: {
        files: [
          {
            src: ['build/wp-content/themes/moddest/*.png'],
            dest: 'build/wp-content/themes/moddest/screenshot.png'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      source_files: {
        files: ['source/**/*.php', 'source/**/*.scss'],
        tasks: ['clean', 'concat:layout_styles', 'sass']
      }
    }
    /*
    replace: {
      less_vars: {
        options: {
          patterns: [
            {
              match: /@/g,
              replacement: '$'
            }
          ]
        },
        files: [
          {
            expand: true,
            src: [
              'source/components/components-styles/*.scss'
            ]
          }
        ]
      }
    }
    */
  });

  // Load the plugin that provides tasks.
  require('load-grunt-tasks')(grunt, {scope: ['devDependencies', 'dependencies']});
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-contrib-rename');

  /*
  grunt.registerTask('rename-less-vars', [
    'replace:less_vars'
  ]);
  */

  grunt.registerTask('whatch-project', [
    'watch'
  ]);

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'concat',
    'sass',
    'copy',
    'rename'
  ]);
};