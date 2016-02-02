
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

	'keypress [id="search-recipes"]': function(e, tmpl){
		if(e.keyCode == 13){
			//todo search recipes
			// Recipes.find({}, {name: {$contains: 'pinto'}}).fetch()
			var searchValue = e.currentTarget.value;
			var searchArray = [];
			searchArray.push(searchValue);
			var regExp = new RegExp(searchValue);
			var searchedRecipes = Recipes.find(
				{$or: [
					{ingredients: 
						{$elemMatch: 
							{name: regExp}
						}
					},
					{author: regExp},
					{title: regExp}
				]}).fetch();
			
			Session.set('viewRecipes',{
				collection: 'search',
				searchVal: searchValue
			});
			//todo - set Session view recipes to all
		}
		
	}


});
Template.MasterLayout.created = function () {
	Session.set('viewRecipes', {
		collection: 'all'
	});

};
Template.MasterLayout.rendered = function () {
	

};