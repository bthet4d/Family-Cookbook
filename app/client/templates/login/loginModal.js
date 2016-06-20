/*****************************************************************************/
/* LoginMenu: Event Handlers */
/*****************************************************************************/
Template.LoginModal.events({
	'click [data-action=login-facebook]': function(e, tmpl){
		e.preventDefault();
		Meteor.loginWithFacebook({requestPermissions: ['email']});
		$('#login-modal').modal('hide');
	},
	'submit #login-user': function(e, tmpl){
		e.preventDefault();

		var login_email = trimInput(tmpl.find('#login-email').value);
		var login_pass =  trimInput(tmpl.find('#login-password').value);
		//todo - check that both contain value

		//call meteor method with call back
		Meteor.loginWithPassword(login_email, login_pass, function(error){
			if(error){
				//set the loginError sessin var that is checked for on render
				Session.set('loginError', error.reason);	
				//display error message
				var loginErrorDiv = tmpl.find('#loginErrors');	
				var errorMessage = '<div class="alert alert-danger" role="alert">';
				errorMessage += error.reason;
				errorMessage += '</div>';
				loginErrorDiv.innerHTML = errorMessage;	
				//reset login fields
				tmpl.find('#login-email').value = '';
				tmpl.find('#login-password').value = '';
				setTimeout(function(){
					loginErrorDiv.innerHTML = '';
				}, 2000);
				
			}else{
				//successful, hide modal
			}
		});
		return false;
		
	}
});

/*****************************************************************************/
/* LoginMenu: Helpers */
/*****************************************************************************/
Template.LoginModal.helpers({
	isLoginServicesConfigured: function() {
      return Accounts.loginServicesConfigured();
    }
});

/*****************************************************************************/
/* LoginMenu: Lifecycle Hooks */
/*****************************************************************************/
Template.LoginModal.created = function () {
};

Template.LoginModal.rendered = function () {
	
};

Template.LoginModal.destroyed = function () {
	

};

var trimInput = function(input){
	var trimmed = input.replace(/^\s*|\s*$/g, "");
    	return trimmed;
}


	