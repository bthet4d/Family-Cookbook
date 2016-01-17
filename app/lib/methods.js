/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   *  if (this.isSimulation) {
   *    // do some client stuff while waiting for
   *    // result from server.
   *    return;
   *  }
   *
   *  // server method logic
   * }
   */
   'getAllRecipes': function(userId){
      if(this.isSimulation){

         return;
      }
      var currentUserId = Meteor.userId();
      if(currentUserId === userId){
         return Recipes.find({});
      }else{
         return false;
      }


   },
   'addOriginalRecipe': function(recipe){
      if(this.isSimulation){
         return;
      }
      if(!Meteor.userId()){
         //todo throw error
         //add roles to allow for people who can add to original
      }else{
         Recipes.insert({
            categoryId: recipe.categoryId,
            directions: recipe.directions,
            ingredients: recipe.ingredients,
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            title: recipe.title,
            author: recipe.author
         });
      }
      
   },
   'removeFromFavorites': function(favoritesId, userId){
      if(this.isSimulation){
         //todo - add insertion into mini- mongo
         return;
      }
      var currentUserId = Meteor.userId();
      if(userId === currentUserId){
         FavoriteRecipes.upsert({_id: favoritesId}, 
         {$set: {
            isFavorite: 0
         }});
      }
      

      
   },
   'addToFavorites': function(recipeId, userId){
      if(this.isSimulation){
         //todo - add insertion into mini-mongo
         
         return;
      }
      var currentUserId = Meteor.userId();
      //check if this user has favorited the reciped before
      var hasFavorited = FavoriteRecipes.find({recipeId: recipeId, user: currentUserId}).count();
      
      if(!hasFavorited){
         
         PopularRecipes.upsert({
            recipeId: recipeId
         }, {$inc: { count: 1}});
         
      }
      
      if(currentUserId === userId){
         favoritesId = FavoriteRecipes.upsert({
            recipeId: recipeId,
            user: userId},
            {$set: {isFavorite: 1}});
      }
   },
   'insertIngredient': function(ingName){
      ingName = ingName.toLowerCase();
      Ingredients.upsert({
         name: ingName,
      }, {$inc: {count: 1}});
   },
   'addComment': function(recipeId, comment){
      Comments.insert({
         recipeId: recipeId,
         createdAt: new Date,
         userId: Meteor.userId(),
         body: comment
      });
   },
   'addPhoto': function(recipeId, photoId){
      RecipePhotos.insert({
         recipeId: recipeId,
         photoId: photoId,
         uploadedBy: Meteor.userId(),
         uploadedAt: new Date()
      });
   }
});
