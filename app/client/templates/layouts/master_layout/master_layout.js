
Template.MasterLayout.helpers({

	ingredient: function(){
		return Ingredients.find();
	},


	
});

Template.MasterLayout.events({
	'click [id="MyFavorites"]': function(){
		Session.set('viewRecipes', {
			collection: 'favorites',

		});
	},
	'click [id="allRecipes"]': function(){
		Session.set('viewRecipes', {
			collection: 'all'
		});
	},


});
Template.MasterLayout.created = function () {
	Session.set('viewRecipes', {
		collection: 'all'
	});

};
Template.MasterLayout.rendered = function () {
	

};