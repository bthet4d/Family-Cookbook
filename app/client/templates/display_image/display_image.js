/*****************************************************************************/
/* DisplayImage: Event Handlers */
/*****************************************************************************/
Template.DisplayImage.events({
});

/*****************************************************************************/
/* DisplayImage: Helpers */
/*****************************************************************************/
Template.DisplayImage.helpers({
	hasImage: function(){
		if(Template.instance().photos.get().count()){
			return true;
		}
		return false;
	},
	displayImage: function(){
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

	}
});

/*****************************************************************************/
/* DisplayImage: Lifecycle Hooks */
/*****************************************************************************/
Template.DisplayImage.created = function () {
	var instance = this;
	var recipeId = Router.current().params.recipeId;
	if(!recipeId){
		recipeId = instance.data.recipeId;
	}
	instance.subscribe('RecipePhotos', recipeId);
	instance.subscribe('images');
		
	instance.photos = new ReactiveVar(RecipePhotos.find({recipeId: recipeId}));
};

Template.DisplayImage.rendered = function () {
};

Template.DisplayImage.destroyed = function () {
};
