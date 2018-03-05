module.exports = function (grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        addtextdomain: {
            options: {
                textdomain: 'edd-card'
            },
            update_all_domains: {
                options: {
                    updateDomains: true
                },
                src: ['*.php', '**/*.php', '!\.git/**/*', '!bin/**/*', '!node_modules/**/*', '!tests/**/*']
            }
        },

        wp_readme_to_markdown: {
            your_target: {
                files: {
                    'README.md': 'readme.txt'
                }
            }
        },

        makepot: {
            target: {
                options: {
                    domainPath: '/languages',
                    exclude: ['\.git/*', 'bin/*', 'node_modules/*', 'tests/*'],
                    mainFile: 'edd-card.php',
                    potFilename: 'edd-card.pot',
                    potHeaders: {
                        poedit: true,
                        'x-poedit-keywordslist': true
                    },
                    type: 'wp-plugin',
                    updateTimestamp: true
                }
            }
        },

        uglify: {
            default: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    'js/edd-card.js': 'js/edd-card.dev.js',
                    'js/jquery.card.js': 'node_modules/card/dist/jquery.card.js'
                }
            },
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    preserveComments: 'some',
                    compress: {
                        drop_console: true
                    },
                    mangle: true
                },
                files: {
                    'js/edd-card.min.js': ['node_modules/card/dist/jquery.card.js', 'js/edd-card.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['i18n', 'wp_readme_to_markdown', 'uglify']);
    grunt.registerTask('i18n', ['addtextdomain', 'makepot']);

    grunt.util.linefeed = '\n';

};
