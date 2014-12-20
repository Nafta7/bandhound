// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    playNext();
  }
}

var songs = document.querySelectorAll('#playlist li a');
var playlist = document.getElementById('playlist');
var search = document.getElementById('search');

search.addEventListener('keypress', function(e){
  if (e.keyCode === 13){
    var videoContainer = document.getElementById('video-container');
    removeClass(videoContainer, 'hidden');
    playFirst();
  }
});

var next = document.getElementById('next-track');
var previous = document.getElementById('previous-track');
var play = document.getElementById('play-track');
next.addEventListener('click', playNext);
previous.addEventListener('click', playPrevious);
play.addEventListener('click', function(){
  playVideo(play.getAttribute('data-play-action'));
});

var changeVideo = function(song){
  removeClass(play, 'fa-play');
  addClass(play, 'fa-pause');
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

function playFirst(){
  var firstSong = songs[0];
  firstSong.setAttribute('playing', true);
  firstSong.setAttribute('class', 'track-playing');
  player.loadVideoById(firstSong.getAttribute('data-youtube-id'));
  var playtube = document.getElementById('playtube');
  removeClass(playtube, 'hidden');
}

function playNext(){
  removeClass(play, 'fa-play');
  addClass(play, 'fa-pause');
  var track = Number(playlist.getAttribute('data-track-playing'));
  if ((track + 1) < songs.length) {
    removeClass(songs[track], 'track-playing');
    playlist.setAttribute('data-track-playing', ++track);
    songs[track].setAttribute('class', 'track-playing');
    player.loadVideoById(songs[track].getAttribute('data-youtube-id'));
  }
}

function playPrevious(){
  removeClass(play, 'fa-play');
  addClass(play, 'fa-pause');
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
    addClass(play, 'fa-play');
    removeClass(play, 'fa-pause');
  }
  else if (action === 'play'){
    player.playVideo();
    play.setAttribute('data-play-action', 'stop');
    addClass(play, 'fa-pause');
    removeClass(play, 'fa-play');
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

function addClass(el, className) {
  if (el.classList)
  el.classList.add(className);
else
  el.className += ' ' + className;
}
