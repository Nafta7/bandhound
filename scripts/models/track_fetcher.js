var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

module.exports = Backbone.Model.extend({
  initialize: function(youtubeCredentials){
    this.key = "key=" + youtubeCredentials.apiKey;
    self.index = 1;
  },

  fetchTrack: function(options){
        // identifies one or more resource properties
        var parts = "part=snippet",
        // filters the API response
        fields = "fields=items(id, snippet(title))",
        // search url
        url = "https://www.googleapis.com/youtube/v3/search?",
        // search keywords
        search = "q=" + options.artist + " - " + options.track,
        //filter to only search for embeddable videos
        allowed = "videoEmbeddable=true&videoSyndicated=true&type=video";

    url = url + search + "&" + parts + "&" + fields + "&" + allowed  + "&" + this.key;

    $.get(url, function(data){
      if (data.items) {
        var attrs = "data-youtube-id='" + data.items[0].id.videoId + "' ";
        attrs += "data-track-index='" + self.index++ + "'";
        var tr = "<tr " + attrs + "><td>" + options.track + "</td>";
        tr += "<td>" + options.artist + "</td></tr>";
        // $('#playlist table').append(tr);
        $(tr).hide().appendTo('#playlist table').fadeIn(1000);
        // data.items[0].snippet.title
      }
    });
  }
});
