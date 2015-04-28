var $ = require('jquery'),
    Backbone = require('backbone'),
    ArtistFinder = require('../models/artist_finder'),
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
      // this.playlist.search();
      this.searchSimilarArtists(this.$el.children('#search-artist').val());
    }
  },

  searchSimilarArtists: function(artist){
    $('#hero').addClass('hidden');
    this.playlist.clear();
    $loader = $('#loader-container');
    $loader.removeClass('hidden');
    $loadMore = $('#load-more');
    $loadMore.addClass('hidden');
    var artistFinder = new ArtistFinder(artist);
    var hideLoader = function(){
      $loader.addClass('hidden');
      $loadMore.removeClass('hidden');
    };
    artistFinder.findSimilar({artist: artist, callback: hideLoader});
    this.playlist.enabled = true;
    // $ldMore = '<div class="col-1-1"><input type="submit" value="Load more"></div>';
    // $('#content-main').append($ldMore);
  }
});
