module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      sourceLayoutStyles:  ['source/components/components-styles/collected-styles/layout.css'],
      sourceVendorStyles:  ['source/components/components-styles/collected-styles/vendor.css'],
      sourceLayoutScripts: ['source/components/components-scripts/collected-scripts/layout.js'],
      sourceVendorScripts: ['source/components/components-scripts/collected-scripts/vendor.js'],

      buildLayoutStyles:   ['build/wp-content/themes/moddest/css/layout.css'],
      buildVendorStyles:   ['build/wp-content/themes/moddest/css/vendor.css'],
      buildLayoutScripts:  ['build/wp-content/themes/moddest/js/layout.js'],
      buildVendorScripts:  ['build/wp-content/themes/moddest/js/vendor.js']
    },

    concat: {
      options: {
        separator: '\n /*SeparatoR*/ \n'
      },
      layoutStyles: {
        src: [
          'source/modules/**/*.scss'
        ],
        dest: 'source/components/components-styles/collected-styles/scss/layout.scss'
      },
      layoutScripts: {
        src: [
          'source/components/components-scripts/layout_inception.js',
          'source/modules/**/*.js',
          'source/components/components-scripts/layout_completion.js'
        ],
        dest: 'source/components/components-scripts/collected-scripts/layout.js'
      },
      vendorStyles: {
        src: [          
          'source/components/components-libs/normalize-css-5.0.0/normalize-5.0.0.css',
          'source/components/components-libs/owl-carousel-1.3.3/owl-carousel/owl.carousel.css',
          'source/components/components-frameworks/bootstrap-3.3.7/css/bootstrap-3.3.7.css',
        ],
        dest: 'source/components/components-styles/collected-styles/css/vendor.css'
      },
      vendorScripts: {
        src: [
          'source/components/components-libs/jquery-1.9.1/jquery-1.9.1.js',
          'source/components/components-frameworks/bootstrap-3.3.7/js/bootstrap-3.3.7.js',
          'source/components/components-libs/owl-carousel-1.3.3/owl-carousel/owl.carousel.js',
        ],
        dest: 'source/components/components-scripts/collected-scripts/vendor.js'
      }
    },

    sass: {
      build: {
        files: {
          'source/components/components-styles/collected-styles/css/layout.css': 'source/components/components-styles/collected-styles/scss/layout.scss'
        }
      }
    },

    copy: {
      toBuildStyles: {
        files: [
          {
            expand: true,
            cwd: "source/components/components-styles/collected-styles/css",
            src: [
              "**"
            ],
            dest: "build/wp-content/themes/moddest/css"
          }
        ]
      },
      toBuildScripts: {
        files: [
          {
            expand: true,
            cwd: "source/components/components-scripts/collected-scripts",
            src: [
              "**"
            ],
            dest: "build/wp-content/themes/moddest/js"
          }
        ]
      }
    },

    replace: {
      pathFonts: {
        options: {
          patterns: [
            {
              match: /\/WP\/WP-Moddest\/source\//g,
              replacement: 'http://php/WP/theme-Moddest/build/wp-content/themes/moddest/'
            }
          ]
        },
        files: [
          {
            expand: true,
            src: [
              'build/wp-content/themes/moddest/css/layout.css'
            ]
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sourceStyles: {
        files: ['source/modules/**/*.scss'],
        tasks: ['clean:sourceLayoutStyles', 'concat:layoutStyles', 'sass', 'clean:buildLayoutStyles', 'copy:toBuildStyles', 'replace:pathFonts' ]
      }
    }
  });

  // Load the plugin that provides tasks.
  require('load-grunt-tasks')(grunt, {scope: ['devDependencies', 'dependencies']});
  require('time-grunt')(grunt);


  grunt.registerTask('watch-project', [ 'watch' ]);


  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'concat',
    'sass',
    'copy',
    'replace'
  ]);
};