CategoriesController = RouteController.extend({
  subscriptions: function () {
        
  },
  waitOn: function(){
    Meteor.subscribe('categories');
    Meteor.subscribe('recipes');
    // Meteor.subscribe('favorite_recipes', Meteor.userId());
  },
  data: function(){
    catId = parseInt(this.params.catId);
    // console.log(catId);
    // recipesByCategory = {
    //   recipes: Recipes.find({categoryId: catId})
    // }
    
    // return recipesByCategory;
    return {
      button: 'addRecipe',
      category: catId
    };
  

  },

  action: function () {
    //render a template that loops over the 
    //paginated results from the database with the
    //catId specified
    this.render('ViewCategory');
    this.render('DisplayPopular', {to: "popular"});
        this.render('BrowseCategories', {to: 'browseCategory'});
    // this.render('BrowseIngredients', {to: 'browseIngredient'});
    this.render('BrowseButtons', {to: 'browseButtons'});

  }
});
