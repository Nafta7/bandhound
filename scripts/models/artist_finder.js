var $ = require('jquery');
var Backbone = require('backbone');
var Artist = require('./artist');
var TrackFetcher = require('./track_fetcher');
var credentials = require('../../credentials.json');

module.exports = Backbone.Model.extend({
  initialize: function(){
    this.fm = new LastFM({
      apiKey    : credentials.lastfm.apiKey,
      apiSecret : credentials.lastfm.apiSecret
    });
  },

  findSimilar: function(options){
    var artist;

    options.limit = options.limit || 8;
    options.page  = options.page  || 1;

    /*
    Since the Last.FM API doesn't provide a page parameter for this action,
    which is, Artist.GetSimilar, we're going to implement a custom paginator
    by ourselves.
    */
    var tailSize  = (options.page - 1) * options.limit,
        totalSize = options.page * options.limit,
        self = this, similar;

    this.fm.artist.getSimilar({
      artist: options.artist,
      limit: totalSize }, {
        success: function(data){
          // Pagination of results
          similar = data.similarartists.artist.slice(tailSize);

          if (similar instanceof Array & similar.length > 2) {
            trackFetcher = new TrackFetcher(credentials.youtube);
            similar.forEach(function(dataArtist){
              artist = new Artist({
                fm: self.fm,
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
