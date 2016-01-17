RecipesController = RouteController.extend({
  subscriptions: function () {
    // set up the subscriptions for the route and optionally
    // wait on them like this:
    //
    // this.subscribe('item', this.params._id).wait();
    //
    // "Waiting" on a subscription does not block. Instead,
    // the subscription handle is added to a reactive list
    // and when all items in this list are ready, this.ready()
    // returns true in any of your route functions.
  },
    waitOn: function(){
    Meteor.subscribe('categories');
    Meteor.subscribe('ingredients');
    
  },

  data: function () {
    // return a global data context like this:
    // Items.findOne({_id: this.params._id});
  },

action: function() {
    //this is reactive
    //and reactive vars here will rerender when they change
    //like a collection of a users favorite recipes
    this.render('Recipes');
    this.render('Browse', {
      to: 'browse'
    });
    this.render('DisplayPopular', {
      to: "popular"
    });
  }
});
