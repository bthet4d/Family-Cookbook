/*****************************************************************************/
/* LoginMenu: Event Handlers */
/*****************************************************************************/
Template.LoginMenu.events({
	'click [data-action=logout]': function(e, tmpl){
		e.preventDefault();
		Meteor.logout();
	}
});

/*****************************************************************************/
/* LoginMenu: Helpers */
/*****************************************************************************/
Template.LoginMenu.helpers({
	
});

/*****************************************************************************/
/* LoginMenu: Lifecycle Hooks */
/*****************************************************************************/
Template.LoginMenu.created = function () {
	Session.set('loginMessage', '');
	 
};

Template.LoginMenu.rendered = function () {
};

Template.LoginMenu.destroyed = function () {
};

