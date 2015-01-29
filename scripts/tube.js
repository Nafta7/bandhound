var TubeView = function(){
  var $playlist, $songs, $play, $search, player;

  var youtube = function(){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = loadVideo;
  },

  init = function(){
    $playlist = $('#playlist');
    $songs = $('#playlist li a');
    $play = $('#play-track');
    $search = $('#search');

    youtube();

    $search.on('keypress', function(e){
      if (e.keyCode === 13){
        $('#loader').show();
        $('#playlist').empty();
        FM.fetchSimilarArtists({artist: $search.val()});
        $('#video-container').removeClass('hidden');
        $('#playtube').removeClass('hidden');
      }
    });

    var $next = $('#next-track'),
        $previous = $('#previous-track');

    $next.on('click', playNext);
    $previous.on('click', playPrevious);

    $play.on('click', function(){
      playVideo($play.attr('data-play-action'));
    });

    $('#toggle-player').on('click', function(e){
      $(this).find('i').toggleClass('fa-chevron-up fa-chevron-down');
      $('#player-fixed').slideToggle('slow');
    });

    $playlist.on('click', 'a', changeVideo);
  },

  loadVideo = function(){
    player = new YT.Player('player', {
      events: {
        onReady: function(){},
        onStateChange: function(e){
            if( (e.target.getPlayerState()===0)){
               playNext();
            }
        }
      },

    });
  },

  playNext = function(){
    $play.removeClass('fa-play');
    $play.addClass('fa-pause');
    var track = Number($playlist.attr('data-track-playing'));

    if ((track + 1) < $songs.length) {
      $songs.eq(track).removeClass('track-playing');
      $playlist.attr('data-track-playing', ++track);
      $songs.eq(track).attr('class', 'track-playing');
      player.loadVideoById($songs.eq(track).attr('data-youtube-id'));
    }
  },

  playPrevious = function(){
    $play.removeClass('fa-play');
    $play.addClass('fa-pause');
    var track = Number($playlist.attr('data-track-playing'));

    if (track -1 >= 0) {
      $songs.eq(track).removeClass('track-playing');
      $playlist.attr('data-track-playing', --track);
      $songs.eq(track).attr('class', 'track-playing');
      player.loadVideoById($songs.eq(track).attr('data-youtube-id'));
    }
  },

  playVideo = function (action){

    if (action === 'stop') {
      player.stopVideo();
      $play.attr('data-play-action', 'play');
      $play.addClass('fa-play');
      $play.removeClass('fa-pause');
    }
    else if (action === 'play'){
      player.playVideo();
      $play.attr('data-play-action', 'stop');
      $play.addClass('fa-pause');
      $play.removeClass('fa-play');
    }
  },

  changeVideo = function(event){
    $songs = $('#playlist a');
    var $song = $(this);
    $play.removeClass('fa-play');
    $play.addClass('fa-pause');

    var track = Number($playlist.attr('data-track-playing'));
    $songs.eq(track).removeClass('track-playing');
    var selectedTrack = Number($song.attr('data-track-index'));
    $songs.eq(selectedTrack).attr('class', 'track-playing');
    $playlist.attr('data-track-playing', selectedTrack);
    player.loadVideoById($song.attr('data-youtube-id'));
  },

  playFirst = function(){
    var firstSong = $('#playlist a').first();
    firstSong.attr('playing', true);
    firstSong.attr('class', 'track-playing');
    $playlist.attr('data-track-playing', '0');
    player.loadVideoById(firstSong.attr('data-youtube-id'));
    var $playtube = $('#playtube');
    var $videoContainer = $('#video-container');
    $videoContainer.removeClass('hidden');
    $playtube.removeClass('hidden');
  };

  return {
    init: init
  };

}();

$(document).ready(function(){
  TubeView.init();
});


// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.ENDED) {
//     playNext();
//   }
// }
