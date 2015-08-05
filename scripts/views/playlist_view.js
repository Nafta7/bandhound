var $ = require('jquery');
var Backbone = require('backbone');
var ArtistFinder = require('../models/artist_finder');
var PlayerView = require('./player_view');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function(){
    this.enabled = false;
    this.selected = null;
    this.player = new PlayerView({
      el: $('#player-controls'),
      playlist: this
    });
    this.$playlist = this.$el.find('table');
    this.page = 1;
    this.isLoading = false;
  },

  events: {
    "click [data-action=play-song]": "playSong",
    "click [data-action=load-more]": "loadMore"
  },

  clear: function(){
    this.$playlist.children('tbody').remove();
    this.selected = null;
    this.playing = null;
  },

  loadMore: function(){
    var loader = '<div class="small-loader"></div>';
    $('[data-action=load-more]').addClass('hidden');
    $('[data-id=more-loader]').append(loader);
     this.artistFinder.findSimilar({
       artist: this.artist, page: ++this.page, callback: this.loadedMore });
  },

  playSong: function(e){
    this.playing = $(e.currentTarget);
    this.selectNewTrack();
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
  },

  findSimilarArtists: function(artist){
    this.clear();
    this.loading();
    this.artistFinder = new ArtistFinder();
    this.artist = artist;

    this.artistFinder.findSimilar({
      artist: artist,
      callback: this.loaded,
      self: this,
      errorHandler: this.errorHandler
    });

    this.enabled = true;
  },

  loading: function(loader){
    this.isLoading = true;
    $('[data-action=load-more]').addClass('hidden');
    $('#playlist table').addClass('hidden');

    // Display load spinner
    var $loader = $('[data-id=main-loader]');
    $loader.append('<div class="loader"></div>');
  },

  errorHandler: function(self, code, message){
    console.log("error code: " + code);
    console.log("message: " + message);
    var $message = $("#message");
    $message.append("Well this is embarrassing...").append("<br>").
      append("We couldn't find any similar artists.");
    $message.removeClass('hidden');

    $('[data-id=main-loader] .loader').remove();
    self.isLoading = false;
  },

  loaded: function(self){
    $('[data-action=load-more]').removeClass('hidden');
    $('#playlist table').removeClass('hidden');
    $('[data-id=main-loader] .loader').remove();
    self.isLoading = false;
  },

  loadedMore: function(){
    $('[data-id=more-loader]').empty();
    $('[data-action=load-more]').removeClass('hidden');
  }
});
