// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var playlist = document.getElementById('playlist');
var songs = document.querySelectorAll('#playlist li a');
var firstSong = songs[0];
firstSong.setAttribute('playing', true);
firstSong.setAttribute('class', 'track-playing');
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: firstSong.getAttribute('data-youtube-id'),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    playNext();
  }
}

var changeVideo = function(song){
  var track = Number(playlist.getAttribute('data-track-playing'));
  removeClass(songs[track], 'track-playing');
  var selectedTrack = Number(song.getAttribute('data-track-index'));
  songs[selectedTrack].setAttribute('class', 'track-playing');
  playlist.setAttribute('data-track-playing', selectedTrack);
  player.loadVideoById(song.getAttribute('data-youtube-id'));
};

[].forEach.call(songs, function(song){
  song.addEventListener('click', function(){
    changeVideo(song);
  });
});

var next = document.getElementById('next-track');
var previous = document.getElementById('previous-track');
var play = document.getElementById('play-track');
next.addEventListener('click', playNext);
previous.addEventListener('click', playPrevious);
play.addEventListener('click', function(){
  playVideo(play.getAttribute('data-play-action'));
});


function playNext(){
  play.setAttribute('value', '||');
  var track = Number(playlist.getAttribute('data-track-playing'));
  if ((track + 1) < songs.length) {
    removeClass(songs[track], 'track-playing');
    playlist.setAttribute('data-track-playing', ++track);
    songs[track].setAttribute('class', 'track-playing');
    player.loadVideoById(songs[track].getAttribute('data-youtube-id'));
  }
}

function playPrevious(){
  play.setAttribute('value', '||');
  var track = Number(playlist.getAttribute('data-track-playing'));
  if ((track - 1) >= 0) {
    removeClass(songs[track], 'track-playing');
    playlist.setAttribute('data-track-playing', --track);
    songs[track].setAttribute('class', 'track-playing');
    player.loadVideoById(songs[track].getAttribute('data-youtube-id'));
  }
}

function playVideo(action){
  if (action === 'stop') {
    player.stopVideo();
    play.setAttribute('data-play-action', 'play');
    play.setAttribute('value', '<>');
  }
  else if (action === 'play'){
    player.playVideo();
    play.setAttribute('data-play-action', 'stop');
    play.setAttribute('value', '||');
  }
}

function removeClass(el, className){
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className
      .replace(new RegExp('(^|\\b)' +
               className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
