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
    "keyup [data-action=main-search]": "keyPressHandler",
    "click [data-action=main-search-submit]": "search"

  },

  keyPressHandler: function(e){
    if (e.keyCode == 13)
      this.search();
  },

  search: function(){
    var query = $('[data-action=main-search]').val();
    this.searchView.search(query)
  },

  hide: function(){
    this.$el.addClass('hidden');
    this.isActive = false;
  }
});
