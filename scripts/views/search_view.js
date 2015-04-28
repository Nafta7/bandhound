var $ = require('jquery'),
    Backbone = require('backbone'),
    PlaylistView = require('./playlist_view');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  initialize: function(){
    this.playlist = new PlaylistView({el: $('#playlist')});
  },

  events: {
    "keyup #search-artist": "keyPressHandler"
  },

  keyPressHandler: function(e){
    if (e.keyCode == 13){
      $('#hero').addClass('hidden');
      this.playlist.findSimilarArtists(this.$el.children('#search-artist').val());
    }
  }
});
