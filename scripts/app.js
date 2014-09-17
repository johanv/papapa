
var AppRouter = Backbone.Router.extend({

  initialize: function() {
    // create models
    this.players = new PlayerCollection();
    this.results = new ResultCollection();

    this.addResultView = new AddResultView({collection: this.players});
    this.bladView = new ResultsView({collection: this.results});

    // Add some sample data for now.
    // players:
    for (i = 1; i <= 4; ++i) {
      var player = new Player();
      player.set({
        code: 'P' + i,
        id: i,
      });
      this.players.add(player);
    }
    // results:
    var result1 = new Result();
    result1.set({
      remark: "start",
      scores: [0, 0, 0, 0],
    });
    this.results.add(result1);

    var result2 = new Result();
    result2.set({
      remark: "vraag & mee",
      scores: [2, 2, -2, -2],
    });
    this.results.add(result2);

  },

  // no routes for the moment
  routes: {
    "" : "index"
  },

  index: function() {
    $('#scoreblad').append(this.bladView.render().el);
    $('#result').append(this.addResultView.render().el);
  }
});

// Models
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

Result = Backbone.Model.extend({
  defaults: {
    remark: "Blah",
    scores: [0, 0, 0, 0],
  }
});

ResultCollection = Backbone.Collection.extend({
  model: Result,
});

PlayerWinCheckboxView = Backbone.View.extend({
  template: _.template($('#playerWinCheckbox').html()),
  events: {
    'click input.check': 'check',
  },
  initialize: function() {
    // clueless again.
    _.bindAll(this, "render", "check");

    this.model.bind('change', this.render);
  },
  render: function() {
    var content = this.template(this.model.toJSON());
    $(this.el).html(content);
    return this;
  },
  check: function() {
    // toggle between win and neutral.
    this.model.set({wins: this.model.get('wins') <= 0 ? 1 : 0});
  }
});

PlayerLooseCheckboxView = Backbone.View.extend({
  template: _.template($('#playerLooseCheckbox').html()),
  events: {
    'click input.check': 'check',
  },
  initialize: function() {
    // clueless again.
    _.bindAll(this, "render");

    this.model.bind('change', this.render);
  },
  render: function() {
    var content = this.template(this.model.toJSON());
    $(this.el).html(content);
    return this;
  },
  check: function() {
    // toggle between loose and neutral.
    this.model.set({wins: this.model.get('wins') >= 0 ? -1 : 0});
  }
});

AddResultView = Backbone.View.extend({
  tagName: "div",
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

var ResultsView = Backbone.View.extend({
  tagname: "div",
  template: _.template($('#scoreTable').html()),
  initialize: function(){
    _.bindAll(this, "render");
  },
  render: function() {
    $(this.el).html(this.template());

    self = this;

    // this is way too ugly
    _.each(this.collection.models, function(model){
      table_line = "<tr><td>"+model.get("remark")+"</td>";
      model.get("scores").forEach(function(score) {
        table_line += "<td>"+score+"</td>";
      });
      $(self.el).find("tbody").append(table_line+"</tr>");
    });
    return this;
  },
});

appRouter = new AppRouter();
Backbone.history.start();
