FavoriteRecipes = new Mongo.Collection('favorite_recipes');
//using meteor methods instead

if (Meteor.isServer) {
  FavoriteRecipes.allow({
    insert: function (userId, doc) {
      return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });


}