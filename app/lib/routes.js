Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  yieldRegions: {
    
  }
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.route('/addRecipe',{
  name: 'addRecipe',
  controller: 'AddRecipeController',
  action: 'action',
  where: 'client'
});

Router.route('/browse/:catId',{
  name: 'browse',
  controller: 'CategoriesController',
  action: 'action',
  where: 'client'
});

Router.route('/recipes', {
  name: 'recipes',
  controller: 'RecipesController',
  action: 'action',
  where: 'client'
});

Router.route('/recipe/:recipeId', {
  name: 'viewRecipe',
  controller: 'ViewRecipeController',
  action: 'action',
  where: 'client'
});