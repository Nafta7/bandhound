var $ = require('jquery'),
    Backbone = require('backbone'),
    SearchView = require('./views/search_view.js');
Backbone.$ = $;

$(document).ready(function(){
  var searchView = new SearchView({el: $('#search')});
});
