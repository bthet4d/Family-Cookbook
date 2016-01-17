FavoriteRecipes = new Mongo.Collection('favorite_recipes');


if (Meteor.isServer) {
  FavoriteRecipes.allow({
    insert: function (userId, doc) {
      return true;
    },
// update: function (userId, doc, fieldNames, modifier) {
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });


}