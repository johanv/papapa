
var AppRouter = Backbone.Router.extend({

  initialize: function() {
    this.players = new PlayerCollection();
    this.addResultView = new AddResultView({collection: this.players, el: "#result"});

    // Add some default players for now.
    for (i = 1; i <= 4; ++i) {
      var player = new Player();
      player.set({
        code: 'P' + i
      });
      this.players.add(player);
    }
  },

  // no routes for the moment
  routes: {
    "" : "index"
  },

  index: function() {
    this.addResultView.render();
  }
});

Player = Backbone.Model.extend({
  defaults: {
    code: 'XXX'
  }
});

PlayerCollection = Backbone.Model.extend({
  model: Player
});

PlayerCheckboxView = Backbone.View.extend({
  template: _.template($('#playerCheckbox').html()),
  initialize: function() {
    // clueless again.
    _.bindAll(this, "render");
  },
  render: function() {
    var content = this.template.tmpl(this.model.toJSON());
    $(this.el).html(content);
    return this;
  }
});

AddResultsView = Backbone.View.extend({
  template: _.template($('#resultInput').html()),
  initialize: function() {
    // no clue about this:
    this.model.bind("reset", this.render, this);
  },

  render: function() {
    $(this.el).html(this.template());
    this.collection.each(function(model){
      var view = new PlayerCheckboxView({model: model});
      $(this.el).find("#winners").append(view);
    });
    return this;
  }
});
