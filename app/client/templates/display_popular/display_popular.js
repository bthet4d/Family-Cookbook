/*****************************************************************************/
/* DisplayPopular: Event Handlers */
/*****************************************************************************/
Template.DisplayPopular.events({
});

/*****************************************************************************/
/* DisplayPopular: Helpers */
/*****************************************************************************/
Template.DisplayPopular.helpers({
	getTitle: function(){
		return recipe.curValue[0].title;
		
	},
	getServings: function(){
		return recipe.curValue[0].servings;
	},
	hasAuthor: function(){
		var hasAuthor = false;
		if(recipe.curValue[0].author){
			hasAuthor = true;
		}
		return hasAuthor;
	},
	getAuthor: function(){
		return recipe.curValue[0].author;
	},
	hasImage: function(){
		var hasImage = false;
		if(recipe.curValue[0].image){
			hasImage = true;
		}
		return hasImage;
	},
	getImage: function(){
		return recipe.curValue[0].image;
	},
	popularRecipe: function(){
		popRecipes = PopularRecipes.find().fetch();
		popRecipes.forEach(function(item, key){
			item.index = key;
		});
		return popRecipes;
	},
	
	firstPopularItem: function(){
		var isFirst = false;
		if(this.index === 0){
			isFirst = true;
		}
		return isFirst;	
	},
	setContext: function(){
		var context = Recipes.find({_id: this.recipeId}).fetch();
		recipe.set(Recipes.find({_id: this.recipeId}).fetch());
		
	}
});

/*****************************************************************************/
/* DisplayPopular: Lifecycle Hooks */
/*****************************************************************************/
Template.DisplayPopular.created = function () {
	var instance = this;
	recipe = new ReactiveVar({});
	var subscription = instance.subscribe('popular_recipes');	
};

Template.DisplayPopular.rendered = function () {
	
};

Template.DisplayPopular.destroyed = function () {
};
