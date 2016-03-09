/*****************************************************************************/
/* LoginMenu: Event Handlers */
/*****************************************************************************/
Template.RegisterModal.events({
	'submit #register-form': function(e, tmpl){
		e.preventDefault();
		
		
		var reg_name = trimInput(tmpl.find('#account-name').value);
		var reg_mail = trimInput(tmpl.find('#account-email').value);
		var reg_pass = trimInput(tmpl.find('#account-password').value);
		var confirmed_reg_pass = null;
		//validate password
		var validMessage = 'Passwords must contain letters and numbers, '
		+ 'be at least six characters long and less than fifty.';
		if(isValidPassword(reg_pass)){
			//hide the register modal
			$('#register-modal').modal('hide');
			//create account
			console.log('create account');
			//build user object
			var user = {
				password: reg_pass,
				email: reg_mail,

				profile: {
					name: reg_name
				}
			}
			//email: reg_mail, password: reg_password
			Accounts.createUser(user, function(error){
				if(error){
					//set session var to the error reason
					console.log('error');
					console.log(error);
					Session.set('loginMessage', error.reason);
				}else{
					console.log('success');
				}
			});
		}else{
			//set the password field to blank
			tmpl.find('#account-password').value = '';
			//display message
			tmpl.message.set(validMessage);
		}
		return false;	
	}
});

/*****************************************************************************/
/* LoginMenu: Helpers */
/*****************************************************************************/
Template.RegisterModal.helpers({
	'displayMessage': function(){
		var msg = Template.instance().message.get();
		if(msg){
			//add the 'has-error' class to the password input
			passInput = document.getElementById('passwordGroup');
			passInput.className = 'form-group has-error';
			var errorDiv = '<div class="alert alert-danger" role="alert">';
			errorDiv += msg
			errorDiv += '</div>'
			return errorDiv;
		}
		return '';
	},
	displayLoginMessage: function(){
		if(Session.get('loginMessage')){

			var errorDiv = '<div class="alert alert-danger">';
			errorDiv += Session.get('loginMessage');
			errorDiv += '</div>';
			return errorDiv;
		}else{
			return '';
		}
	}
	
});

/*****************************************************************************/
/* LoginMenu: Lifecycle Hooks */
/*****************************************************************************/
Template.RegisterModal.created = function () {
	 var instance = this
	 instance.message = new ReactiveVar();
};

Template.RegisterModal.rendered = function () {
	
};

Template.RegisterModal.destroyed = function () {

};

var trimInput = function(input){
	var trimmed = input.replace(/^\s*|\s*$/g, "");
    	return trimmed;
}

var isValidPassword = function(password){
	var validMessage = 'Passwords must contain letters and numbers, be at least six characters long and less than 50.';
	var isValid = true;
	if(password.length < 6){
		console.log('password too short');
		
		isValid = false;

	}
	if(password.length > 50){
		console.log('password too long');
		isValid = false;
	}
	if(password.search(/\d/) == -1){
		console.log('no numbers');
		isValid = false;
	}
	if(password.search(/[a-zA-Z]/) == -1){
		console.log('no letters');
		isValid = false;
	}
	return isValid;
}