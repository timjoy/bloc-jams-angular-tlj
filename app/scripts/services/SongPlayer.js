(function() {
     function SongPlayer(Fixtures) {

          /**
          *@desc object that SongPlayer service returns, making it public
          *@type object
          */
          var SongPlayer = {};

          var currentAlbum = Fixtures.getAlbum();

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
          SongPlayer.currentSong = null;
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
                 //stopSong();//sec.8 assignment

             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
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
          *@function getSongIndex
          *@desc accesses the index of the song
          *@param {Object} song
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

          /**
          *@desc Active song object from list of songs
          *@type {Object}
          */
          SongPlayer.currentSong = null;

          /**
          *@function play
          *@desc Play current or new song
          *@param {Object} song
          */
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
               setSong(song);
               //currentBuzzObject.play();
               //song.playing = true;=>
               playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
          };

          /**
          *@function pause
          *@desc Pause current song
          *@param {Object} song
          */
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };

          /**
          *@function previous
          *@desc goes to the previous song
          *@param {Object} currentSong
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                  //currentBuzzObject.stop()
                  //SongPlayer.currentSong.playing = null
                  stopSong();//sec. 8 assignment
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          /**
          *@function previous
          *@desc goes to the next song
          *@param {Object} currentSong
          */
          SongPlayer.next = function() {

              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
              console.log(currentSongIndex);

              if (currentSongIndex > 4){

                  stopSong();
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          }

          var stopSong = function() {
            currentBuzzObject.stop();
            song.playing = null;
          };

          return SongPlayer;
     };

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
