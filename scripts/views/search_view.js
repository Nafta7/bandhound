var SearchView = Backbone.View.extend({
  initialize: function(){
    self = this;
  },

  events: {
    "keyup #search-artist": "keyPressHandler"
  },

  keyPressHandler: function(e){
    if (e.keyCode == 13){
      self.searchSimilarArtists(self.$el.children('#search-artist').val());
    }
  },

  searchSimilarArtists: function(artist){
    var artistFinder = new ArtistFinder(artist);
    artistFinder.findSimilar({artist: artist});
  }
});

$(document).ready(function(){
  var searchView = new SearchView({el: $('#search')});
});
