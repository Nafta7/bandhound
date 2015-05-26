var $ = require('jquery');
var Backbone = require('backbone');
var Artist = require('./artist');
var TrackFetcher = require('./track_fetcher');

module.exports = Backbone.Model.extend({
  initialize: function(){
  },

  findSimilar: function(options){
    var fm = new LastFM({
      apiKey    : 'b26bc1d28ac087bd6ee4bbaa4fe186ee',
      apiSecret : '4b9340fc31f703706649cc8f617a9939'
    });
    var artist;

    options.limit = options.limit || 5;
    options.page  = options.page  || 0;

    /*
    Since the Last.FM API doesn't provide a page parameter for this action,
    which is, Artist.GetSimilar, we're going to implement a custom pagination
    by ourselves.
    */
    var pageSize = options.page * 5;     // Page size
    var tail = options.limit + pageSize; // Tail
    var similar;                         // Stores pagination result

    fm.artist.getSimilar({
      artist: options.artist,
      limit: tail }, {
        success: function(data){
          // Pagination of results
          similar = data.similarartists.artist.slice(pageSize);

          if (similar instanceof Array & similar.length > 2) {
            trackFetcher = new TrackFetcher();
            similar.forEach(function(dataArtist){
              artist = new Artist({
                fm: fm,
                trackFetcher: trackFetcher
              });
              artist.topTracks({mbid: dataArtist.mbid, limit: 2});
            });

            setTimeout(function(){
              options.callback(options.self);
            }, 500);
          }
          else {
            options.errorHandler(options.self, "001", "Insuficient similar artists.");
          }
        }, error: function(code, message){
            options.errorHandler(options.self, code, message);
    }});
  }
});
