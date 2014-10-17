module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            options: {
                paths: 'css/less',
                yuicompress: true
            },
            files: {
                'css/style.css': 'css/less/style.less'
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            css: {
                src: ['css/animations.css', 'css/app.css'],
                dest: 'dist/css/built.css',
            },
            js: {
                src: ['js/app.js', 'js/animations.js', 'js/controllers.js', 'js/filters.js', 'js/services.js'],
                dest: 'dist/js/built.js',
            },
        },

        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'dist/js/built.min.js': ['dist/js/built.js']
                }
            }
        },

        watch: {
            less: {
                files: 'css/less/*.less',
                tasks: ['less', 'concat:css']
            },
            js: {
                files: 'js/*.js',
                tasks: ['concat:js', 'uglify']
            }
        },

        exec: {
            bower_install: 'bower install',
            server_start: 'node server.js -h localhost -p 8000',
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-exec')

    grunt.registerTask('default', ['concat', 'uglify'])
    grunt.registerTask('install', ['exec:bower_install'])
    grunt.registerTask('start', ['concat', 'uglify', 'exec:server_start'])
}