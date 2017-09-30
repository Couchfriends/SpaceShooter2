module.exports = function(grunt) {

    var config = {
        app: 'src',
        dist: 'dist'
    };

    var sourceFiles = [];

    var pkg = grunt.file.readJSON('package.json');

    for (var depPkg in pkg.dependencies) {
        var depPgkFile = depPkg.replace(/\.js/, '');
        sourceFiles.push('node_modules/' + depPkg + '/dist/' + depPgkFile + '.js');
    }
    console.log(sourceFiles);

    sourceFiles.push([
        '<%= config.app %>/scripts/Game/Game.js',
        '<%= config.app %>/scripts/Game/Game.Element.js',
        '<%= config.app %>/scripts/Game/Game.Interaction.js',
        '<%= config.app %>/scripts/Game/Entities/Game.Entity.js',
        '<%= config.app %>/scripts/Game/Entities/Game.Entity.Player.js',
        '<%= config.app %>/scripts/Game/Menu/Game.Button.js',
        '<%= config.app %>/scripts/Game/Missions/Game.Missions.js',
        '<%= config.app %>/scripts/Game/Stages/Game.Stage.js',
        '<%= config.app %>/scripts/Game/Stages/Game.Stage.Menu.js',
        '<%= config.app %>/scripts/Game/Stages/Game.Stage.MenuGame.js',
        '<%= config.app %>/scripts/Game/Stages/Game.Stage.MenuOptions.js',
        '<%= config.app %>/scripts/Game/Stages/Game.Stage.MenuOptionsSounds.js',
        '<%= config.app %>/scripts/Game/Stages/Game.Stage.MenuOptionsVideo.js',
        '<%= config.app %>/scripts/Game/Stages/Game/Game.Stage.Game.js',
        '<%= config.app %>/scripts/app.js'
    ]);

    // Project configuration.
    grunt.initConfig({

        // Project settings
        config: config,
        pkg: pkg,
        uglify: {
            options: {
                banner: '/*! MIT Couchfriends.com */\n'
            },
            build: {
                src: sourceFiles,
                dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'data/**/*.*'
                    ]
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', [
        'uglify',
        'copy:main'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};