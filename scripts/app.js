var $ = require('jquery');
var Backbone = require('backbone');
var MainView = require('./views/main_view.js');

Backbone.$ = $;

$(document).ready(function(){
  var mainView = new MainView({el: $('#discover')});
});
