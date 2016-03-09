/*****************************************************************************/
/* DisplayRecipe: Event Handlers */
/*****************************************************************************/
Template.DisplayRecipe.events({
	'click [id=recipeTitle]':function(e){
		e.preventDefault();
		var recipeId = this._id;
		window.location.assign('/recipe/' + recipeId);
		
	},
	'click [id=favoriteButton]': function(e){
		e.preventDefault();
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
		var files = event.target.files;
		var recipeId = this.recipeId;
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
		for(var i = 0; i <= 5; i++){
			if(i === 0){
				ingList += this.ingredients[i].name;
			}else{
				ingList += ', ' + this.ingredients[i].name;
			}
		}
		//add link to view more
		ingList += ', <a id="ingLink" href="recipe/' + this._id + '">more...</a>';
		return ingList;
	},
	getAuthor: function(){
		var tempName = '';
		var tempNameArray = this.author.split(' ');
		tempNameArray.forEach(function(name, index){
			tempNameArray[index] = name.charAt(0).toUpperCase() + name.substr(1);
			// tempNameArray[index] = capName;
		});
		return tempNameArray.join(' ');
	
	},
	getTitle: function(){
		var tempTile = '';
		var tempTileArray = this.title.split(' ');
		tempTileArray.forEach(function(title, index){
			tempTileArray[index] = title.charAt(0).toUpperCase() + title.substr(1);
		});
		return tempTileArray.join(' ');
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
