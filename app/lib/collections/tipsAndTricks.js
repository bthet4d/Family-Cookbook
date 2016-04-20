TipsAndTricks = new Meteor.Collection('tipsAndTricks');
var tips = TipsAndTricks.find({}).fetch();
if(!tips.length){
	var firstTip = '';
	//todo create and structure tip

	//todo insert tip
}