var $ = require('jquery');
var Backbone = require('backbone');
var PlaylistView = require('./playlist_view');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize : function (options) {
    this.isPlaying = false;
    this.options = options || {};
    this.playlist = options.playlist;
    this.initYoutube();
    this.togglePlayer(null);
    this.isVisible = false;
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
    'click [data-action=previous-track]': 'playPrevious',
    'click [data-action=next-track]': 'playNext',
    'click [data-action=toggle-player]': 'togglePlayer',
    'click [data-action=play-track]': 'playStop'
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
    var $playIcon = this.$el.find('[data-action=play-track] span');
    $playIcon.attr('data-glyph', 'media-pause');

    this.player.playVideo();
    this.isPlaying = true;
  },

  stopPlaying: function(){
    var $playIcon = this.$el.find('[data-action=play-track] span');
    $playIcon.attr('data-glyph', 'media-play');

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

    var toggle = $('[data-action=toggle-player] span');
    var state = toggle.attr('data-glyph');
    var toggledState = state == 'chevron-bottom' ? 'chevron-top'
                                             : 'chevron-bottom';
    toggle.attr('data-glyph', toggledState);
    $('[data-action=player-slide]').slideToggle('slow');
  },

  play: function(track){
    if (!this.isVisible) {
      this.$el.removeClass('hidden');
      this.isVisible = true;
    }
    this.nowPlaying(track.artist, track.title);
    this.player.loadVideoById(track.id);
    this.isPlaying = true;

    var $playIcon = this.$el.find('[data-action=play-track] span');
    $playIcon.attr('data-glyph', 'media-pause');
  },

  nowPlaying: function(artist, title){
    this.$el.find('[data-action=display-track-name]').text(title);
    this.$el.find('[data-action=display-artist-name]').text(artist);
  }

});
