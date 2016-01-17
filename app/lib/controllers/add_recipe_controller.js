AddRecipeController = RouteController.extend({
  subscriptions: function () {
    Meteor.subscribe('recipes');
  },

  data: function () {
    // return a global data context like this:
    // Items.findOne({_id: this.params._id});
  },

  action: function () {
    this.render('AddRecipe', { /* data: {} */});
    // this.render('DisplayPopular', {to: "popular"});
    this.render('BrowseButtons', {to: 'browseButtons'});
    this.render('BrowseCategories', {to: 'browseCategory'});
    // this.render('BrowseIngredients', {to: 'browseIngredient'});
  }
});
