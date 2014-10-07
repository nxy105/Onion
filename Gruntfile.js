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
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: '*', dest: 'public/stylesheets/', filter: 'isFile'}
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
                    {expand: true, cwd: 'bower_components/angular-resource/', src: '*.js', dest: 'public/javascripts/lib/', filter: 'isFile'}
                ]
            }
        }
    };

    grunt.initConfig(config);

    // load copy plugin
    grunt.loadNpmTasks('grunt-contrib-copy');

    // regist dev task
    grunt.registerTask('dev', ['copy']);
};

// Export the configuration
module.exports = configureGrunt;