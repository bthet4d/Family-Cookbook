
Template.MasterLayout.helpers({

	ingredient: function(){
		return Ingredients.find();
	}
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
	'submit [id="search-form"]': function(e){
		e.preventDefault();	
		var form = e.currentTarget;
		var searchVal = form.elements['search-recipes'].value;
		//todo - route to recipes
		Session.set('viewRecipes',{
			collection: 'search',
			searchVal: searchVal
		});
		Router.go('/recipes');

	}


});
Template.MasterLayout.created = function () {
	Session.set('viewRecipes', {
		collection: 'all'
	});

};
Template.MasterLayout.rendered = function () {
	

};