/*****************************************************************************/
/* RemoveFavoritesButton: Event Handlers */
/*****************************************************************************/
Template.RemoveFavoritesButton.events({
	'click [id=removeFavorites]': function(e){
		e.preventDefault();
		Meteor.call('removeFromFavorites', this.self, Meteor.userId(),
			function(err, result){
			//todo - return and deal with a result
		});
	}
});

/*****************************************************************************/
/* RemoveFavoritesButton: Helpers */
/*****************************************************************************/
Template.RemoveFavoritesButton.helpers({
});

/*****************************************************************************/
/* RemoveFavoritesButton: Lifecycle Hooks */
/*****************************************************************************/
Template.RemoveFavoritesButton.created = function () {
};

Template.RemoveFavoritesButton.rendered = function () {
};

Template.RemoveFavoritesButton.destroyed = function () {
};
