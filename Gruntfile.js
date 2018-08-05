'use strict';

const exec = require('child_process').exec;

module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        execute : {
            client_build : {
                call : function (grunt, options, async) {
                    var done = async();
                    exec('npm run build', {cwd : 'client'}, function (err, stdout, stderr){
                        if(err) return console.log(err);
                        if(stdout) console.log(stdout);
                        if(stderr) console.log(stderr);
                        done();
                    });
                }
            }
        },
        move : {
            dist : {
                src : 'client/dist',
                dest : 'dist'
            }
        },
        clean : {
            dist : ['dist/**']
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-move');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean:dist', 'execute:client_build', 'move:dist']);  
}
