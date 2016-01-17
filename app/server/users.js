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
	console.log(_.pick(result.data, 'name', 'email'));
	return _.pick(result.data, 'name', 'email');
}

Accounts.onCreateUser(function(options, user){
	user.profile = getUserInfo(user.services.facebook.accessToken);
	user.name = user.profile.name;
	user.email = user.profile.email;
	console.log('!!! user !!!');
	console.log(user);
	return user;
});

Accounts.onLogin(function(loginInfo){
	var user = loginInfo.user;
	var accessToken = user.services.facebook.accessToken;
	var userInfo = getUserInfo(accessToken);
	Meteor.users.update({_id: user._id}, {
		$set: {
			profile: userInfo,
			name: userInfo.name,
			email: userInfo.email
		}
	});
});