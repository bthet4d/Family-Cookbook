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
	newRow: function(){
		var newRow = false
		var mod = recipeCount % 3;
		// console.log(recipeCount + ' divided by 3 - remainder = ' + mod );
		if(recipeCount !== 0 && recipeCount % 3 === 0){
			newRow = true;
		}
		
		recipeCount++;
		return newRow;
	},
	isFirst: function(){
		if(recipeCount === 0){
			return true;
		}else{
			return false;
		}
	},
	isLast: function(){
		var recipesLength = recipesToView.get().fetch().length;
		if(recipesLength === recipeCount && recipesLength >= 3){
			console.log('is last');
			return true;
		}
		return false;
	},
	recipeRows: function(){
		//group recipes into chunks
		rows = [];
		var recipes = recipesToView.get().fetch();
		var count = 0;
		var tempArray = [];
		recipes.forEach(function(recipe){
			if(count % 3 === 0 && count != 0){
				rows.push(tempArray);
				tempArray = [];
				tempArray.push(recipe);
			}else{
				tempArray.push(recipe);
			}
			count++;
		});
		//add any left over recipes to the rows array
		if(tempArray){
		rows.push(tempArray);
		}
		
		return rows;
	},
	recipeRow: function(){
		return this;
	},
	test: function(){
		console.log('this in test function');
		console.log(this);
		//coressponds to a row
	}

});

/*****************************************************************************/
/* Recipes: Lifecycle Hooks */
/*****************************************************************************/
Template.Recipes.created = function () {
	recipeCount = 0;
	
	var instance = this;
	hasFilters = new ReactiveVar(false);
	header = new ReactiveVar('');
	recipesToView = new ReactiveVar();
	instance.subscribe('recipes');
	instance.subscribe('favorite_recipes');
	instance.subscribe('popular_recipes');
	
	instance.favorites = new ReactiveVar(FavoriteRecipes.find());
	instance.autorun(function(){
		if(Session.get('viewRecipes').collection === 'all'){
			header.set('All Recipes');
			recipesToView.set(Recipes.find());
		}else if(Session.get('viewRecipes').collection === 'favorites'){
			header.set('My Favorites');
			//todo filter recipesToView on the client
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
		}else if(Session.get('viewRecipes').collection === 'search'){
			var searchText = Session.get('viewRecipes').searchVal.toLowerCase();
			var regExp = new RegExp(searchText);
			var searchedRecipes = Recipes.find(
				{$or: [
					{ingredients: 
						{$elemMatch: 
							{name: regExp}
						}
					},
					{author: regExp},
					{title: regExp}
				]});
			recipesToView.set(searchedRecipes);
		}else if(Session.get('viewRecipes').collection === 'popular'){
			var popRecipes = PopularRecipes.find({}).fetch();
			var ids = [];
			popRecipes.forEach(function(recipe){
				ids.push(recipe._id);
			});
			recipesToView.set(Recipes.find({}, {_id: {$in: ids}}));
		}
		lengthRecipes = 0;

	});
	
};

Template.Recipes.rendered = function () {
	filterIngredients = [];
};

Template.Recipes.destroyed = function () {
};
