var $ = require('jquery');
var Backbone = require('backbone');
var PlaylistView = require('./playlist_view');

Backbone.$ = $;

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
