CommentsController = RouteController.extend({
  subscriptions: function () {
    
  },
  waitOn: function(){
    
    Meteor.subscribe('comments', this.params.recipeId);
  },

  data: function () {
    return Recipes.findOne({_id: this.params._id});
  },

  action: function () {
    this.render('Comments', {});
  }
});
