// # Task automation for Onion
var configureGrunt = function(grunt) {
    // Project configuration.
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        // copy js and css
        copy: {
            bootstrap: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: '*.css', dest: 'public/stylesheets/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: '*', dest: 'public/fonts/', filter: 'isFile'}
                ]
            },
            jquery: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery/dist/', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'}
                ]
            },
            angular: {
                files: [
                    {expand: true, cwd: 'bower_components/angular/', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/angular-route/', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/angular-resource/', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/angular-timer/dist', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'}
                ]
            },
            moment: {
                files: [
                    {expand: true, flatten: true, src: 'bower_components/moment/moment.js', dest: 'public/javascripts/lib/', filter: 'isFile'}
                ]
            },
            onion: {
                files: [
                    {expand: true, cwd: 'src/client/views/', src: '*.html', dest: 'public/javascripts/view/', filter: 'isFile'}
                ]
            }
        },
        concat: {
            options: {
                separator: "\n\n"
            },
            dev: {
                src: ['src/client/app.js', 'src/client/controllers/*.js', 'src/client/services/*.js'],
                dest: 'public/javascripts/main/app.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/client/**/*'],
                tasks: ['copy:onion', 'concat:dev']
            },
        },
    };

    grunt.initConfig(config);

    // load copy plugin
    grunt.loadNpmTasks('grunt-contrib-copy');

    // load concat plugin
    grunt.loadNpmTasks('grunt-contrib-concat');

    // watch concat plugin
    grunt.loadNpmTasks('grunt-contrib-watch');

    // regist dev task
    grunt.registerTask('dev', ['copy', 'concat']);

    // regist dev-watch task
    grunt.registerTask('dev-watch', ['watch']);
};

// Export the configuration
module.exports = configureGrunt;