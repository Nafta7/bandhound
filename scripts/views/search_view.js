var $ = require('jquery'),
    Backbone = require('backbone'),
    ArtistFinder = require('../models/artist_finder');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  events: {
    "keyup #search-artist": "keyPressHandler"
  },

  keyPressHandler: function(e){
    if (e.keyCode == 13){
      this.searchSimilarArtists(this.$el.children('#search-artist').val());
    }
  },

  searchSimilarArtists: function(artist){
    var artistFinder = new ArtistFinder(artist);
    artistFinder.findSimilar({artist: artist});
  }
});
