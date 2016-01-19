/*****************************************************************************/
/* RecipePage: Event Handlers */
/*****************************************************************************/
Template.RecipePage.events({
});

/*****************************************************************************/
/* RecipePage: Helpers */
/*****************************************************************************/
Template.RecipePage.helpers({
	showRecipe:function(){
		
	},
	title: function(){
		return Template.instance().recipe.get().title;
	},
	ingredient: function(){
		return Template.instance().recipe.get().ingredients;
	},
	getDirections: function(){
		return Template.instance().recipe.get().directions;
	},
	recipeId: function(){
		return Template.instance().recipe.get()._id;
	},
	prepTime: function(){
		return Template.instance().recipe.get().prepTime;
	},
	servings: function(){
		return Template.instance().recipe.get().servings;
	},
	hasTime: function(){

		return false;
	},
	hasServings: function(){

		return false;
	}
});

/*****************************************************************************/
/* RecipePage: Lifecycle Hooks */
/*****************************************************************************/
Template.RecipePage.created = function () {
	var instance = this;	
	var recipeId = Router.current().params.recipeId;
    instance.subscribe('singleRecipe', recipeId);
    instance.subscribe('comments', recipeId);
    instance.autorun(function(){
    	var singleRecipe = Recipes.findOne({_id: recipeId});
    	instance.recipe = new ReactiveVar(singleRecipe);
    });    
	
};

Template.RecipePage.rendered = function () {
};

Template.RecipePage.destroyed = function () {
};
