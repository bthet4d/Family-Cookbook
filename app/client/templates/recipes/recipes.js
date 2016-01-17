/*****************************************************************************/
/* Recipes: Event Handlers */
/*****************************************************************************/
//todo - remove the count and isRow functions...try and recall purpose of this
Template.Recipes.events({
});

/*****************************************************************************/
/* Recipes: Helpers */
/*****************************************************************************/
Template.Recipes.helpers({
	recipe: function(){
		return recipesToView.get();
	},
	getData: function(){
		return this;
	},
	hasRecipe: function(){
		return recipesToView.get().fetch().length;
	},
	getHeader: function(){
		return '<h3 class="filterby">' + header.get() + '</h3>';
	},filterSet: function(){
		return hasFilters.get();
	},
	getActiveTab: function(){
		var active = Template.instance().activeTab.get();
		if(active === 'tips'){
			$('#tips').addClass('active');
		}else if(active === 'category'){
			$('#browseCategory').addClass('active');
		}else if(active === 'ingredient'){
			$('#browseIngredient').addClass('active');
		}
	},
	countRecipe: function(){

		recipeCount++;
		if(recipeCount % 3 === 0){
			Session.set('newRow', true);
		}else{
			Session.set('newRow', false);
		}
	},
	newRow: function(){
		return Session.get('newRow');
	}
});

/*****************************************************************************/
/* Recipes: Lifecycle Hooks */
/*****************************************************************************/
Template.Recipes.created = function () {
	var instance = this;
	hasFilters = new ReactiveVar(false);
	header = new ReactiveVar('');
	recipesToView = new ReactiveVar();
	recipeCount = 0;
	instance.subscribe('recipes');
	instance.subscribe('favorite_recipes');
	
	instance.favorites = new ReactiveVar(FavoriteRecipes.find());
	instance.autorun(function(){
		if(Session.get('viewRecipes').collection === 'all'){
			header.set('All Recipes');
			recipeCount = 0;
			recipesToView.set(Recipes.find());
		}else if(Session.get('viewRecipes').collection === 'favorites'){
			header.set('My Favorites');
			//todo filter recipesToView on the client
			recipeCount = 0;
			var favs = FavoriteRecipes.find({user: Meteor.userId(), isFavorite: 1}, {fields: {recipeId: 1}}).fetch();
			var favoriteIds = [];
		  	for(info in favs){
		  		favoriteIds.push(favs[info].recipeId);
		  	}
		  	var favRec = Recipes.find({_id: {$in: favoriteIds}});
			recipesToView.set(Recipes.find({_id: {$in: favoriteIds}}));
		}else if(Session.get('viewRecipes').collection === 'byCategory'){
			header.set(Session.get('viewRecipes').name);
			var catId = Session.get('viewRecipes').category;
			recipesToView.set(Recipes.find({categoryId: catId}));

		}else if(Session.get('viewRecipes').collection === 'byIngredient'){
			filterIngredients = Session.get('viewRecipes').ingredients;
			var filterText = filterIngredients.join(", ");
			if(filterIngredients.length > 0){
				header.set('Filtering by: ' + filterText);
				hasFilters.set(true);
			
			}else{
				header.set('Add a filter');
				hasFilters.set(false);
			}
			
			recipesToView.set(Recipes.find({}, {ingredients: {$elemMatch: {name: {$all: filterIngredients}}}}));
		}
	});
	
};

Template.Recipes.rendered = function () {
	filterIngredients = [];
};

Template.Recipes.destroyed = function () {
};
