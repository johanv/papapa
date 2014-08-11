
var AppRouter = Backbone.Router.extend({

  initialize: function() {
    this.players = new PlayerCollection();
    this.addResultView = new AddResultView({collection: this.players});

    // Add some default players for now.
    // (The thing below does not work)

    /*
    for (i = 1; i <= 4; ++i) {
      var player = new Player();
      player.set({
        code: 'P' + i
      });
      this.players.add(player);
    }
    */
  },

  // no routes for the moment
  routes: {
    "" : "index"
  },

  index: function() {
    //this.addResultView.render();
    $('#result').html(this.addResultView.render().el);
  }
});

Player = Backbone.Model.extend({
  defaults: {
    code: 'XXX',
    wins: 0, // -1: loses, 0 nothing, 1 wins
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

AddResultView = Backbone.View.extend({
  tagName: "div",
  className: "div",
  template: _.template($('#resultInput').html()),
  initialize: function() {
    // no clue about this:
    //this.model.bind("reset", this.render, this);
    _.bindAll(this, "render");
  },

  render: function() {
    $(this.el).html(this.template());
    _.each(this.collection.players, function(model){
      var view = new PlayerCheckboxView({model: model});
      $(this.el).find("#winners").append(view);
    });
    return this;
  }
});

appRouter = new AppRouter();
Backbone.history.start();
