<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<link rel="stylesheet" type="text/css" href="main.css" />
<title>Pa pa pa</title>


</head>

<body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.js"></script>
<script src="http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min.js"></script>


<div id="scoreblad">
</div>

<script>
$(function(){
  var Lijn = Backbone.Model.extend({
    defaults: {
      nr: 0,
      spel: 'dummy',
      // dubbels zal het nifty systeem worden om te kijken hoe vaak de punten
      // in deze lijn verdubbeld worden, en of er in de volgende spelletjes ook
      // dubbel gespeeld zal worden. Hiervoor ga ik gebruik maken van de lijn-
      // nummers.
      // Bijv. [14,14,15]. Als we nu op lijn 15 zitten, wordt er 3dubbel gespeeld:
      // omdat er op lijn 15 ronde pas is, en op lijn 14 was het ook ronde pas.
      // Op lijn 14 is er zo vaak gepast dat er ook op lijn 16 dubbel gespeeld wordt,
      // vandaar dat 14 er twee keer in staat.
      dubbels: [],
      deler: 0,
      scores: [0, 0, 0, 0, 0] // we spelen met een pisser
    }
  });

  var Blad = Backbone.Collection.extend({
    model: Lijn
  });

  var LijnView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function(){
      _.bindAll(this, 'render', 'appendCell');
    },

    render: function(){
      // I am not sure why I am doing this:
      var self = this;

      this.appendCell(this.model.get('spel'));
      _(this.model.get('scores')).each(function(score){
        self.appendCell(score);
      }, this);

      return this;
    },

    appendCell: function(score){
      $(this.el).append('<td>'+score+'</td>');
    }
  });
  
  var BladView = Backbone.View.extend({
    el: $('div#scoreblad'),

    events: {
      'click button#add': 'addLijn'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addLijn', 'appendLijn');

      this.collection = new Blad();
      this.collection.bind('add', this.appendLijn);

      this.render();
    },

    render: function(){
      // I am not sure why I am doing this:
      var self = this;

      // Die header zal uiteraard ook dynamisch moeten
      $(this.el).append("<button id='add'>Add line</button>");
      $(this.el).append('<table id="scoreblad"> <caption>Scoreblad</caption> <thead> <tr><th>Spel</th><th>Scr</th><th>DVL</th><th>DTL</th><th>DLB</th><th>Png</th></tr> </thead> <tbody> </tbody> </table>');

      _(this.collection.models).each(function(lijn){
        self.appendLijn(lijn);
      }, this);
    },

    addLijn: function(){
      var lijn = new Lijn();
      this.collection.add(lijn);
    },

    appendLijn: function(lijn){
      var lijnView = new LijnView({
        model: lijn
      });
      $('table', this.el).append(lijnView.render().el);
    }
  });

  var bladView = new BladView();
}());
</script>

</body>
</html>
