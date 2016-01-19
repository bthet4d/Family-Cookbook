AddRecipeController = RouteController.extend({
  subscriptions: function () {
    Meteor.subscribe('recipes');
  },

  data: function () {
    
  },

  action: function () {
    this.render('AddRecipe', { /* data: {} */});
    // this.render('DisplayPopular', {to: "popular"});
    this.render('BrowseButtons', {to: 'browseButtons'});
    this.render('BrowseCategories', {to: 'browseCategory'});
  }
});
