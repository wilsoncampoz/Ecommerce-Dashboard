#!/usr/bin/env node

// Inicializando o Grunt
module.exports = function(grunt) {
   grunt.initConfig({
   		/****** Diretórios ******/

        paths:{
          prod : 'dist/', // Pasta de distribuição. Será enviada para o servidor.
          dev : 'src/' //Pasta onde deve ser desenvolvido o projeto.
        },

        /****** Tasks ******/

        /* Deleta a pasta dist, caso a mesma já exista */
        clean: {
              dist: {
                  src: '<%= paths.prod %>' //pasta que será deletada
              }
         },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/main.css': ['src/assets/**/*.sass', 'src/assets/**/*.scss']
                }
            }
        },

        watch: {
            css: {
              files: ['**/*.scss', '**/*.sass'],
              tasks: ['sass:dist'],
              options: {
                  spawn: false
              }
            },
            js: {
              files: ['src/assets/app/*.js', 'src/assets/app/factories/*.js',
              'src/assets/app/services/*.js', 'src/assets/app/controllers/*.js', 'src/assets/app/directives/*.js'],
              tasks: ['concat:dist']
            }
        },

        concat: {
          dist: {
            // the files to concatenate
            src: ['src/assets/app/*.js', 'src/assets/app/factories/*.js',
            'src/assets/app/services/*.js', 'src/assets/app/controllers/*.js', 'src/assets/app/directives/*.js'],
            // the location of the resulting JS file
            dest: 'dist/app.js'
          }
        },

        /* Minificar JS */
        uglify: {
          options: {
              mangle: {
                except: ['*.min.js']
              }
          },
          dist: {
            files: {
              'dist/app.min.js' : ['dist/app.js']
            }
          }
        },

});

  //Carregando plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');


  //Registrando Tarefas
  grunt.registerTask('dist', ['clean',]); //Cria a pasta de distribuição, se ela já existir, apaga e cria de novo

  //Task Default (Será executada quando rodar Grunt no terminal)
  //Rode essa Task quando finalizar o projeto.
  grunt.registerTask('default', ['dist', 'concat', 'uglify',]);
};
