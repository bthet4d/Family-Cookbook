/*****************************************************************************/
/* DisplayRecipe: Event Handlers */
/*****************************************************************************/
Template.DisplayRecipe.events({
	'click [id=recipeTitle]':function(e){
		e.preventDefault();
		// recipeId = $(this).data('id');
		var recipeId = this._id;
		window.location.assign('/recipe/' + recipeId);
		
	},
	'click [id=addFavorites]': function(){
		// FavoriteRecipes.insert({
		// 	user: Meteor.userId(),
		// 	recipeId: this._id
		// });
	},
	'click [id=favoriteButton]': function(e){
		e.preventDefault();
		console.log('add to favorites');
		var selectedButton = e.currentTarget;
		var action = $(selectedButton).data('action');
		var recipeId = $(selectedButton).data('id');
		if(action === 'add'){
			//call meteor add function
			Meteor.call('addToFavorites', recipeId, Meteor.userId(), function(error, result){
				//todo handle return values
				if(result){
				}
			});
			
		}else if(action === 'remove'){
			//call meteor remove funtion
			Meteor.call('removeFromFavorites', recipeId, Meteor.userId(), function(error, result){
				//todo handle return values
			});
			
		}
	},
	'change [id="uploadPhoto"]': function(e){
		console.log(this);
		var files = event.target.files;
		var recipeId = this.recipeId;
		console.log('recipeid');
		console.log(recipeId);
		for(var i = 0, ln = files.length; i < ln; i++){
			files[i].recipeId = this._id;

			Images.insert(files[i], function(error, fileObj){
				if(error){
					console.log(error);
				}else{
					Meteor.call('addPhoto', recipeId, fileObj._id);
				}
			});
		}
		
	}
});

/*****************************************************************************/
/* DisplayRecipe: Helpers */
/*****************************************************************************/
Template.DisplayRecipe.helpers({
	isFavorite: function(){
			//todo - fix logig
		var isRecipe = FavoriteRecipes.findOne({recipeId: this._id, user: Meteor.userId()});

		if(isRecipe && isRecipe.isFavorite){
			return true;
		}else{
			return false
		}
	},
	getContext: function(){
		
		var favId = FavoriteRecipes.findOne({recipeId: this._id, user: Meteor.userId()});
		if(favId && favId.isFavorite){
			return favId._id;
		}else{
			return this._id;
		}
	},
	hasImage: function(){
		if(Template.instance().photos.get().count()){
			return true;
		}
		return false;
	},
	displayImage: function()
	{
		var imageUrls = [];
		var links = '';
		Template.instance().photos.get().forEach(function(doc){
			image = Images.findOne({_id: doc.photoId});
			imageUrls.push(image.url());
		});
		if(imageUrls)
		{
			imageUrls.forEach(function(doc)
			{
		  		links += '<a href="' + doc + '" target="_blank" class="thumbnail"><img src="' + doc + '"/></a>';
			});
		
		}
		return links;

	},
	getId: function(){
		return Template.instance().data._id
	},
	hasPrepTime: function(){
		return this.prepTime;
	},
	hasServings: function(){
		return this.servings;
	},
	getIngredientsList: function(){
		var ingList = '';
		this.ingredients.forEach(function(ing, i){
			if(i === 0){
				ingList += ing.name;
			}else{
				ingList += ', ' + ing.name
			}
		});
		return ingList;
	}
});

/*****************************************************************************/
/* DisplayRecipe: Lifecycle Hooks */
/*****************************************************************************/
Template.DisplayRecipe.created = function () {
	var instance = this;
	var recipeId = this.data._id;
	instance.subscribe('favorite_recipes');
	instance.subscribe('RecipePhotos', recipeId);
	instance.subscribe('images');
		
	instance.photos = new ReactiveVar(RecipePhotos.find({recipeId: recipeId}));
	
};

Template.DisplayRecipe.rendered = function () {

		
};

Template.DisplayRecipe.destroyed = function () {
};