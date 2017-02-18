module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      themeStyles:       ['build/wp-content/themes/moddest/style.css'],
      themeScripts:       ['build/wp-content/themes/moddest/js/**'],
      themeImages:       ['build/wp-content/themes/moddest/images/**'],
      source_less: ['source/components/components-styles/collected-styles/**'],
      source_js:   ['source/components/components-scripts/collected-scripts/**']
    },

    concat: {
      options: {
        separator: '\n /*SeparatoR*/ \n'
      },
      themeStyles: {
        src: [
          'source/modules/**/*.scss'
        ],
        dest: 'source/components/components-styles/collected-styles/scss/layout.scss'
      },
      themeScripts: {
        src: [
          'source/components/components-scripts/layout_inception.js',
          'source/modules/**/*.js',
          'source/components/components-scripts/layout_completion.js'
        ],
        dest: 'source/components/components-scripts/collected-scripts/layout.js'
      },
      /*
      homepageMarkup: {
        src: [
          'source/pages/page-head.php',
          'source/modules/modules-main/home/*.php',
          'source/pages/page-end.php'
        ],
        dest: 'build/wp-content/themes/moddest/index.php'
      },
      */
      allStyles: {
        src: [
          'source/theme/styles-description.css',
          'source/components/components-libs/normalize-css-5.0.0/normalize-5.0.0.css',
          'source/components/components-libs/owl-carousel-1.3.3/owl-carousel/owl.carousel.css',
          'source/components/components-frameworks/bootstrap-3.3.7/css/bootstrap-3.3.7.css',
          'source/components/components-styles/collected-styles/css/layout.css'
        ],
        dest: 'build/wp-content/themes/moddest/style.css'
      },
      allScripts: {
        src: [
          'source/components/components-libs/jquery-1.9.1/jquery-1.9.1.js',
          'source/components/components-frameworks/bootstrap-3.3.7/js/bootstrap-3.3.7.js',
          'source/components/components-libs/owl-carousel-1.3.3/owl-carousel/owl.carousel.js',
          'source/components/components-scripts/collected-scripts/layout.js'
        ],
        dest: 'build/wp-content/themes/moddest/js/main.js'
      }
    },

    sass: {
      dist: {
        files: {
          'source/components/components-styles/collected-styles/css/layout.css': 'source/components/components-styles/collected-styles/scss/layout.scss'
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'source/images',
            src: [
              '**'
            ],
            dest: 'build/wp-content/themes/moddest/images'
          },
          /*{
            expand: true,
            cwd: 'source/images/logo-theme/makro-solntse',
            src: [
              '*.png'
            ],
            dest: 'build/wp-content/themes/moddest/'
          },*/
          {
            expand: true,
            cwd: 'source/theme',
            src: [
              '*.php'
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
    },
    
    replace: {
    /*
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
     */

      imagesPaths: {
        options: {
          patterns: [
            {
              match: /..\/source\/images/g,
              replacement: 'wp-content/themes/moddest/images'              
            }
          ]
        },
        files: [
          {
            expand: true,
            src: [
              'build/wp-content/themes/moddest/index.php'
            ]
          }
        ]
      },
      stylesPaths: {
        options: {
          patterns: [
            {
              match: /\s{2}<link[^>]+>\n/g,
              replacement: ''
            },
            {
              match: /<\/head>/,
              replacement: '\t\<link rel="stylesheet" href='+ '<?php bloginfo(\'stylesheet_url\');?>' +'>\n<\/head>'
            }
          ]
        },
        files: [
          {
            expand: true,
            src: [
              'build/wp-content/themes/moddest/index.php'
            ]
          }
        ]
      },
      scriptsPaths: {
        options: {
          patterns: [
            {
              match: /\s{4}<script[^>]+><\/script>\n/g,
              replacement: ''
            }
          ]
        },
        files: [
          {
            expand: true,
            src: [
              'build/wp-content/themes/moddest/index.php'
            ]
          }
        ]
      }
    }
    
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
    'concat:themeStyles', 'concat:themeScripts',
    'sass',
    // 'concat:homepageMarkup',
    'concat:allStyles', 'concat:allScripts',
    'copy',
    'rename',
    'replace'
  ]);
};