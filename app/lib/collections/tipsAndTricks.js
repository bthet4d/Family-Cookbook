TipsAndTricks = new Meteor.Collection('tipsAndTricks');
var tips = TipsAndTricks.find({}).fetch();
console.log('tips');
console.log(tips);
if(!tips.length){
	var firstTip = '';
	//todo create and structure tip

	//todo insert tip
}