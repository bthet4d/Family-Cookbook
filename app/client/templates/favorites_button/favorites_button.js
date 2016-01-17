/*****************************************************************************/
/* FavoritesButton: Event Handlers */
/*****************************************************************************/
Template.FavoritesButton.events({
	'click [id="addToFavorites"]': function(e){
		e.preventDefault();
		console.log('add to favorites');
		console.log($(this));
		var user = Meteor.userId();
		var recipeId = this.self;
		//add class
		$(this).addClass('selected-glyph');
		Meteor.call('addToFavorites', recipeId, user,
		 function(err, result){
			//todo- return and deal with a result
		});
	}
});

/*****************************************************************************/
/* FavoritesButton: Helpers */
/*****************************************************************************/
Template.FavoritesButton.helpers({
	getId: function(){
		return this.self;
	}
});

/*****************************************************************************/
/* FavoritesButton: Lifecycle Hooks */
/*****************************************************************************/
Template.FavoritesButton.created = function () {
};

Template.FavoritesButton.rendered = function () {
};

Template.FavoritesButton.destroyed = function () {
};
