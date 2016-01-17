/*****************************************************************************/
/* NavBar: Event Handlers */
/*****************************************************************************/
Template.NavBar.events({
	
});

/*****************************************************************************/
/* NavBar: Helpers */
/*****************************************************************************/
Template.NavBar.helpers({
	
});

/*****************************************************************************/
/* NavBar: Lifecycle Hooks */
/*****************************************************************************/
Template.NavBar.created = function () {
	 
	
};

Template.NavBar.rendered = function () {
};

Template.NavBar.destroyed = function () {
};

/*****************************************************************************/
/* LoginMenu: Event Handlers */
/*****************************************************************************/
Template.LoginMenu.events({
	'click [data-action=login]': function(e, tmpl){
		e.preventDefault();
		Meteor.loginWithFacebook({requestPermissions: ['email']});
	},
	'click [data-action=logout]': function(e, tmpl){
		console.log('meteor logout');
		e.preventDefault();
		Meteor.logout();
	}
});

/*****************************************************************************/
/* LoginMenu: Helpers */
/*****************************************************************************/
Template.LoginMenu.helpers({
	isLoginServicesConfigured: function() {
      return Accounts.loginServicesConfigured();
    }
});

/*****************************************************************************/
/* LoginMenu: Lifecycle Hooks */
/*****************************************************************************/
Template.LoginMenu.created = function () {
	 
	
};

Template.LoginMenu.rendered = function () {
};

Template.LoginMenu.destroyed = function () {
};