
var AppRouter = Backbone.Router.extend({

  initialize: function() {
    this.players = new PlayerCollection();
    this.addResultView = new AddResultView({collection: this.players});

    // Add some default players for now.
    // (The thing below does not work)

    for (i = 1; i <= 4; ++i) {
      var player = new Player();
      player.set({
        code: 'P' + i,
        id: i,
      });
      this.players.add(player);
    }
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
    id: 0,
    code: 'XXX',
    wins: 0, // -1: loses, 0 nothing, 1 wins
  }
});

PlayerCollection = Backbone.Collection.extend({
  model: Player
});

PlayerWinCheckboxView = Backbone.View.extend({
  template: _.template($('#playerWinCheckbox').html()),
  initialize: function() {
    // clueless again.
    _.bindAll(this, "render");
  },
  render: function() {
    var content = this.template(this.model.toJSON());
    $(this.el).html(content);
    return this;
  }
});

PlayerLooseCheckboxView = Backbone.View.extend({
  template: _.template($('#playerLooseCheckbox').html()),
  initialize: function() {
    // clueless again.
    _.bindAll(this, "render");
  },
  render: function() {
    var content = this.template(this.model.toJSON());
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

    // I think we need to copy 'this' to 'self', because
    // when the callback function is executed, 'this' will be gone.

    self = this;
    _.each(this.collection.models, function(model){
      var view1 = new PlayerWinCheckboxView({model: model});
      $(self.el).find("#winners").append(view1.render().el);
      var view2 = new PlayerLooseCheckboxView({model: model});
      $(self.el).find("#losers").append(view2.render().el);
    });
    return this;
  }
});

appRouter = new AppRouter();
Backbone.history.start();
