var FM = (function(){
  var ytb,
      fm = new LastFM({
        apiKey    : 'b26bc1d28ac087bd6ee4bbaa4fe186ee',
        apiSecret : '4b9340fc31f703706649cc8f617a9939'
      }),

  similarArtists = function(options){
    options.limit = options.limit || 10;
    fm.artist.getSimilar({artist: options.artist, limit: options.limit,
      page: options.page},
    {success: function(data){
      ytb = new YTB();
      data.similarartists.artist.forEach(function(artist){
        fetchTopTracks({id: artist.mbid, limit: 2});
      });
    }, error: function(code, message){
      console.log(message);
    }});
  },

  fetchTopTracks = function(options){
    var alike = [];
    fm.artist.getTopTracks({mbid: options.id, limit: options.limit},
    {success: function(data){
      data.toptracks.track.forEach(function(track){
        ytb.pullSong({artist: track.artist.name, track: track.name});
      });
      $('#loader').hide();
    }, error: function(code, message){
      console.log(message);
    }});
  };

  return {
    fetchSimilarArtists: similarArtists
  };
})();
