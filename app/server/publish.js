/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('recipes', function (/* args */) {
	if(!this.userId) return this.ready();
	return Recipes.find();
});
Meteor.publish('singleRecipe', function(recipeId){
	if(!this.userId) return this.ready();
	return Recipes.find({_id: recipeId});

	// return [
	// 	Recipes.findOne({_id: recipeId}),
	// 	Comments.find({recipeId: recipeId}, {sort: {createdAt: -1}})
	// 	];
});


Meteor.publish('favorite_recipes', function () {
  if(!this.userId) return this.ready();
  return FavoriteRecipes.find({user: this.userId});
});

Meteor.publish('myFavorites', function(){
	if(!this.userId) return this.ready();
  	var favs = FavoriteRecipes.find({user: this.userId, isFavorite: 1}, {fields: {recipeId: 1, _id: 0}}).fetch();
  	var favoriteIds = [];
  	for(info in favs){
  		favoriteIds.push(favs[info].recipeId);
  	}
  var recipes = Recipes.find({_id: {$in: favoriteIds}}).fetch();
  return Recipes.find({_id: {$in: favoriteIds}});
});

Meteor.publish('recipeCategory', function(catId){
	if(!this.userId) return this.ready();
	return Recipes.find({categoryId: catId});
});

Meteor.publish('recipeByIngredient', function(filterIngredients){
	if(!this.userId) return this.ready();
	return Recipes.find({ingredients: {$elemMatch: {name: {$all: filterIngredients}}}});
});


Meteor.publish('categories', function(){
	if(!this.userId) return this.ready();
	return Categories.find();
});

Meteor.publish('test_collection', function(){
	if(!this.userId) return this.ready();
	return TestCollection.find();
});

Meteor.publish('comments', function(recipeId){
	if(!this.userId) return this.ready();
	return Comments.find({recipeId: recipeId});

});
Meteor.publish('popular_recipes', function(){
	if(!this.userId) return this.ready();
	
	return PopularRecipes.find();
});

Meteor.publish('ingredients', function(){
	if(!this.userId) return this.ready();
	return Ingredients.find({}, {sort: {count: -1}, limit: 20});

});

Meteor.publish('RecipePhotos', function(recipeId){
	if(!this.userId) return this.ready();
	return RecipePhotos.find({recipeId: recipeId});
});


Meteor.publish('images', function(){
	if(!this.userId) return this.ready();
	return Images.find({});
});





