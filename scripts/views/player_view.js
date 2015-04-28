var $ = require('jquery'),
    Backbone = require('backbone'),
    PlaylistView = require('./playlist_view');

Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  initialize : function (options) {
    this.isPlaying = false;
    this.options = options || {};
    this.playlist = options.playlist;
    this.initYoutube();
    this.togglePlayer(null);
  },

  initYoutube: function(){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var self = this;
    window.onYouTubeIframeAPIReady = function(){
      self.player = new YT.Player('player', {
        events: {
          onReady: function(){},
          onStateChange: function(e){
            if( (e.target.getPlayerState()===0)){
               self.playNext();
            }
          }
        },
      });
    }
  },

  events: {
    'click #previous-track': 'playPrevious',
    'click #next-track': 'playNext',
    'click #toggle-player': 'togglePlayer',
    'click #play-track': 'playStop'
  },

  playStop: function(){
    if (this.playlist.enabled){
      if (this.isPlaying)
        this.stopPlaying();
      else
        this.startPlaying();
    }
  },

  startPlaying: function(){
    var $play = this.$el.find('#play-track');
    $play.removeClass('fa-play').addClass('fa-pause');

    this.player.playVideo();
    this.isPlaying = true;
  },

  stopPlaying: function(){
    var $play = this.$el.find('#play-track');
    $play.removeClass('fa-pause').addClass('fa-play');

    this.player.stopVideo();
    this.isPlaying = false;
  },

  playPrevious: function(){
    if (this.playlist.enabled){
      var prevTrack = this.playlist.previousSong();
      if (prevTrack != null)
        this.play(prevTrack);
    }
  },

  playNext: function(){
    if (this.playlist.enabled) {
      var nextTrack = this.playlist.nextSong();
      if (nextTrack!= null)
        this.play(nextTrack);
    }
  },

  togglePlayer: function(e){
    if (e != null)
      e.preventDefault();

    $('#toggle-player i').toggleClass('fa-chevron-up fa-chevron-down');
    $('#player-fixed').slideToggle('slow');
  },

  play: function(track){
    this.nowPlaying(track.artist, track.title);
    this.player.loadVideoById(track.id);
    this.isPlaying = true;
    var $play = this.$el.find('#play-track');
    $play.removeClass('fa-play').addClass('fa-pause');
  },

  nowPlaying: function(artist, title){
    this.$el.find('#track').text(title);
    this.$el.find('#artist').text(artist);
  }

});
