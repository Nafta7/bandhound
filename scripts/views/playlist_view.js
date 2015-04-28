var $ = require('jquery'),
    Backbone = require('backbone'),
    PlayerView = require('./player_view');

Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  initialize: function(){
    this.enabled = false;
    this.selected = null;
    this.player = new PlayerView({
      el: $('#player-controls'),
      playlist: this
    });
  },

  events: {
    "click tr": "playSong"
  },

  search: function(){
    this.$el.empty();
    var self = this;
    setTimeout(function(){
      var list = "<tr " + "data-youtube-id='I67ThDYhk7g'";
      list += " data-track-index='0'>" + "<td>Honey</td><td>Open Hand</td></tr>";

      list += "<tr " + "data-youtube-id='TkogNHMcXQI'";
      list += " data-track-index='1'>" + "<td>Crooked crown</td><td>Open Hand</td></tr>";

      list += "<tr " + "data-youtube-id='A_HZqcLylT4'";
      list += " data-track-index='2'>" + "<td>Life as it is</td><td>Open Hand</td></tr>";

      self.$el.append(list);
      self.enabled = true;
    }, 1);
  },

  clear: function(){
    this.$el.children('tbody').remove();
    this.selected = null;
    this.playing = null;
  },

  playSong: function(e){
    if (this.selected != null) {
      this.selected.removeClass('current');
    }
    this.selected = $(e.currentTarget);
    this.selected.addClass('current');

    this.playing = $(e.currentTarget);
    var track  = $(e.currentTarget).children('td')[0].innerText;
    var artist = $(e.currentTarget).children('td')[1].innerText;
    var id = $(e.currentTarget).attr('data-youtube-id');
    this.player.play({artist: artist, title: track, id: id});
  },

  selectNewTrack: function(){
    if (this.selected != null)
      this.selected.removeClass('current');
    this.selected = this.playing;
    this.selected.addClass('current');
  },

  previousSong: function(){
    if (this.playing.prev().length == 0)
      return null;

    this.playing = this.playing.prev();
    this.selectNewTrack();
    return {
      artist: this.playing.children('td')[1].innerText,
      title : this.playing.children('td')[0].innerText,
      id    : this.playing.attr('data-youtube-id')
    };
  },

  nextSong: function(){
    if (this.playing.next().length == 0)
      return null;

    this.playing = this.playing.next();
    this.selectNewTrack();
    return {
      artist: this.playing.children('td')[1].innerText,
      title : this.playing.children('td')[0].innerText,
      id    : this.playing.attr('data-youtube-id')
    };
  }
});
