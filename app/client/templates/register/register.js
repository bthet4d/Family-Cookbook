/*****************************************************************************/
/* Register: Event Handlers */
/*****************************************************************************/
Template.Register.events({
	
	'click #createAccount': function(event){
		event.preventDefault();
		var email = event.target.registerEmail.value;
		var password = event.target.registerPassword.value;
		var userName = event.target.registerUserName.value;
		if(userName && email && password){
			Accounts.createUser({
				username: userName,
				email: email,
				password: password
			});
		}else{
			//todo - highlight missing fields
			alert('You must enter all items');
		}
		
	},
	'click #logIn': function(e){
		e.preventDefault();
		var email = $('#registerEmail').val();
		var userName = $('#registerUserName').val();
		var password = $('#registerPassword').val();
		// var email = event.target.registerEmail.value;
		// var userName = event.target.registerUserName.value;
		// var password = event.target.registerPassword.value;
		
		if(!password){
			alert('You enter a password');
		}
		if(!userName && !email){
			alert('You must enter either a username or an email address');
		}
		if(userName){
			Meteor.loginWithPassword(userName, password, function(error){
				if(error){
					//todo - handle error
					alert(error.reason);
				}
			});
		}else if(email){
			Meteor.loginWithPassword(email, password, function(error){
				
				if (error) {
					//todo - handle error
					alert(error.reason);
				};
			});
		}
		var userId = Meteor.userId();
	},
	'click #logInWithFacebook': function(e){
		e.preventDefault();
	},

	'click .close': function(e){
		e.preventDefault();
		$('#loginModal').modal('hide');
	}
});

/*****************************************************************************/
/* Register: Helpers */
/*****************************************************************************/
Template.Register.helpers({
	'getUser': function(){
	}
});

/*****************************************************************************/
/* Register: Lifecycle Hooks */
/*****************************************************************************/
Template.Register.created = function () {
};

Template.Register.rendered = function () {
};

Template.Register.destroyed = function () {
};
