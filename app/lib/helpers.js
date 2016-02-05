Meteor.methods({
	'capitilizeOnSpaces': function(value){
		var tempArray = value.split(' ');
		tempArray.forEach(function(name, index){
			tempArray[index] = name.charAt(0).toUpperCase() + name.substr(1);
		});
		return tempArray.join(' ');
	}


});