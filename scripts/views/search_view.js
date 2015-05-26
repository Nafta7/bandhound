var $ = require('jquery');
var Backbone = require('backbone');
var PlaylistView = require('./playlist_view');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function(options){
    this.main = options.main;
    this.playlist = new PlaylistView({el: $('#playlist')});
  },

  events: {
    "keyup #search-artist": "keyPressHandler"
  },

  keyPressHandler: function(e){
    var self = this;
    if (e.keyCode == 13)
      this.search(this.$el.children('#search-artist').val());
  },

  search: function(artistName){
    this.clearMessages();
    if (artistName == "" || this.playlist.isLoading)
      return;

    if (this.main.isActive)
      this.main.hide();
    this.playlist.findSimilarArtists(artistName);
  },

  clearMessages: function(){
    $("#message").empty();
    $("#message").addClass('hidden');
  }
});
