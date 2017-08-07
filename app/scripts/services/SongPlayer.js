(function() {
     function SongPlayer() {

          /**
          *@desc object that SongPlayer service returns, making it public
          *@type object
          */
          var SongPlayer = {};

          /**
          *@desc song that is currently loaded
          *@type object
          */
          var currentSong = null;

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
          };

          /**
          *@function playSong
          *@desc Plays the current song from BuzzObject audio file
          *@param {Object} song
          */
          var playSong = function(song){
            //play the current Buzz object
            currentBuzzObject.play();
            //Set the playing property of the song
            //object to true.
            song.playing = true;
          }

          /**
          *@function SongPlayer.play
          *@desc Plays the current audio file loaded by the setSong function
          *@param {Object} song
          */
          SongPlayer.play = function(song) {
            if (currentSong !== song) {
               setSong(song);
               //currentBuzzObject.play();
               //song.playing = true;
               playSong(song);

            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
          };

          /**
          *@function SongPlayer.pause
          *@desc Pauses the currently playing song
          *@param {Object} song
          */
          SongPlayer.pause = function(song) {
              currentBuzzObject.pause();
              song.playing = false;
          };

          return SongPlayer;
     };

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
