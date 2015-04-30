var $ = require('jquery');
var Backbone = require('backbone');
var SearchView = require('./views/search_view.js');

Backbone.$ = $;

$(document).ready(function(){
  var searchView = new SearchView({el: $('#search')});
});
