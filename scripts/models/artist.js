var Artist = Backbone.Model.extend({
  topTracks: function(options){
    var fm = this.get('fm');
    var trackFetcher = this.get('trackFetcher');

    fm.artist.getTopTracks({mbid: options.mbid, limit: options.limit},
    {success: function(data){
      data.toptracks.track.forEach(function(track){
        trackFetcher.fetchTrack({artist: track.artist.name, track: track.name});
      });
      $('#loader').hide();
    }, error: function(code, message){
      console.log(message);
    }});
  }
});
