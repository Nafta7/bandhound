var YTB = (function(){
  var playlist = document.getElementById('playlist'),
      index = 1;

  var pullSongs = function(options){
    var req = new XMLHttpRequest();
    var key = 'key=AIzaSyC4weqo3y3a0GT_LbRVH4u7-My-lK6hcAE';

    // identifies one or more resource properties.
    var parts = "part=snippet";

    // filters the API response.
    var fields = "fields=items(id, snippet(title))";

    // search url.
    var url = "https://www.googleapis.com/youtube/v3/search?";

    // search keywords.
    var search = "q=" + options.artist + " - " + options.track;

    url = url + search + "&" + fields + "&" + parts + "&" + key;
    req.open("GET", url, false);
    req.send(null);
    var obj = JSON.parse(req.responseText);
    if (obj.items)
    {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute('data-youtube-id', obj.items[0].id.videoId);
      a.setAttribute('data-track-index', index++);
      a.innerText = obj.items[0].snippet.title;
      li.appendChild(a);
      playlist.appendChild(li);
    }
  };

  return {
    pullSongs: pullSongs
  };
})();
