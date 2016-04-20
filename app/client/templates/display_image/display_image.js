/*****************************************************************************/
/* DisplayImage: Event Handlers */
/*****************************************************************************/
Template.DisplayImage.events({
	'change [id="uploadPhoto"]': function(e){
		var files = event.target.files;
		var recipeId = Router.current().params.recipeId;
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
	instance.recipeId = Router.current().params.recipeId;
	if(!instance.recipeId){
		instance.recipeId = instance.data.recipeId;
	}
	instance.subscribe('RecipePhotos', instance.recipeId);
	instance.subscribe('images');
		
	instance.photos = new ReactiveVar(RecipePhotos.find({recipeId: instance.recipeId}));
};

Template.DisplayImage.rendered = function () {
};

Template.DisplayImage.destroyed = function () {
};
