var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = window.$;

module.exports = Backbone.Model.extend({
  initialize: function(){
    self = this;
    self.index = 0;
  },

  fetchTrack: function(options){
    var key = 'key=AIzaSyC4weqo3y3a0GT_LbRVH4u7-My-lK6hcAE',
        // identifies one or more resource properties
        parts = "part=snippet",
        // filters the API response
        fields = "fields=items(id, snippet(title))",
        // search url
        url = "https://www.googleapis.com/youtube/v3/search?",
        // search keywords
        search = "q=" + options.artist + " - " + options.track,
        //filter to only search for embeddable videos
        allowed = "videoEmbeddable=true&videoSyndicated=true&type=video";

    url = url + search + "&" + parts + "&" + fields + "&" + allowed  + "&" + key;

    $.get(url, function(data){
      if (data.items) {
        var attrs = "data-youtube-id='" + data.items[0].id.videoId + "' ";
        attrs += "data-track-index='" + self.index++ + "'";
        var tr = "<tr " + attrs + "><td>" + options.track + "</td>";
        tr += "<td>" + options.artist + "</td></tr>";
        $('#playlist').append(tr);
        // data.items[0].snippet.title
      }
    });
  }
});
