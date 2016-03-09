//note the regular account creation works with this completely
//commented out, so try only setting AND returning data if the 
//user.services.facebook object exists

function getUserInfo(accessToken){
	var result = HTTP.get("https://graph.facebook.com/me",{
		headers:{
			'User-Agent': 'Meteor'
		},
		params: {
			access_token: accessToken,
			fields: ['name', 'email']
		}
	});
	return _.pick(result.data, 'name', 'email');
}

Accounts.onCreateUser(function(options, user){
	var profile = options.profile;
	if(profile){
		user.profile = profile;
	}

	return user;
});

// Accounts.onLogin(function(loginInfo){
// 	console.log(loginInfo);
// 	return;
// 	var user = loginInfo.user;
// 	var userInfo = loginInfo.profile;
	
// 	Meteor.users.update({_id: user._id}, {
// 	$set: {
// 		profile: userInfo,
// 		name: userInfo.name,
// 		email: userInfo.email
// 	}
// });
	
	
// });