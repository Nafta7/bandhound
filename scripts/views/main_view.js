var $ = require('jquery');
var Backbone = require('backbone');
var SearchView = require('./search_view');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function(){
    this.searchView = new SearchView({
      el: $('#search'),
      main: this
    });
    this.isActive = true;
  },

  events: {
    "keyup #main-search": "keyPressHandler",
    "click #main-search-submit": "search"

  },

  keyPressHandler: function(e){
    if (e.keyCode == 13)
      this.search();
  },

  search: function(){
    var query = $('#main-search').val();
    if (query !== "")
      this.searchView.search($("#main-search").val());
  },

  hide: function(){
    this.$el.addClass('hidden');
    this.isActive = false;
  }
});
