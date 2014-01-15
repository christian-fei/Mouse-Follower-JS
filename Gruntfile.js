'use strict';

var lrPort = 35666,
    servingPort = 4000,
    destFolder = '_site';

var lrInstance = require( 'connect-livereload' )({
    port: lrPort
});

var mountFolder = function ( connect, dir ) {
    return connect.static( require( 'path' ).resolve( dir ) );
};

module.exports = function ( grunt ) {


    pkg: grunt.file.readJSON('package.json'),
    require( 'matchdep' ).filterDev('grunt-*').forEach( grunt.loadNpmTasks );

    grunt.initConfig({
        /*
          LIVERELOAD SETUP
        */
        connect: {
            options: {port: servingPort,hostname: 'localhost'},
            livereload: {options: {middleware: function ( connect ) {return [lrInstance,mountFolder(connect, destFolder)];}}}
        },
        /*
          LAUNCH A SERVER AND OPEN THE BROWSER
        */
        open: {
            server: {path: 'http://localhost:<%= connect.options.port %>'}
        },
        /*
          COMPILE SCSS AND SASS FILES
            CHANGE cssDir and sassDir to your needs!
            optional: use the config.rb file 
              (by simply removing the options above and uncommentis config: ...)
        */
        compass: {
          compile: {
            options: {
              // cssDir: 'components/js/',
              // sassDir: 'components/js/',
              // outputStyle: 'compressed',
              config: 'config.rb'
            }
          }
        },

        /*
        auto prefixer
        */
        autoprefixer:{
            dist:{
                files:{
                    'mouse-follower.demo.css':'mouse-follower.demo.css'
                }
            }
        },
        /*
          UGLIFY and CONCAT YOUR JS FILES:
            YOU NEED TO CHANGE THE VALUES BELOW DEPENDING ON YOUR SETUP
            SYNTAX :
              'dest' : ['src']
        */
        uglify: {
            dist: {
                files: {
                    'built.min.js': [ 'MouseFollower.js', 'main.js' ]
                }
            }
        }
    });
    
    grunt.registerTask( 'build' , [
        'uglify',
        'compass',
        'autoprefixer'
    ]);
};