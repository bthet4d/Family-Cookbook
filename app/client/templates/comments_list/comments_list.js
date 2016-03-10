/*****************************************************************************/
/* CommentsList: Event Handlers */
/*****************************************************************************/
Template.CommentsList.events({
	'submit #new_comment': function(e, tmpl){
		e.preventDefault();
		var recipe = this;
		var body = tmpl.find('textarea[name=body]').value;
		var form = tmpl.find('form');
		Meteor.call('addComment', recipe._id, body);
		form.reset();
	},
	'click #loadComments': function(){
		commentLimit.set(commentLimit.get() + 5);
	}
});

/*****************************************************************************/
/* CommentsList: Helpers */
/*****************************************************************************/
Template.CommentsList.helpers({
	comments: function(){
		var comments = Comments.find({recipeId: this._id}, {sort: {createdAt: -1}, limit: commentLimit.get() + 5}).fetch();
		return comments;
	},
	user: function(){
		return Meteor.users.findOne({_id: this.userId});
	},
	timestamp: function(){
		return moment(this.createdAt).fromNow();
	}
});

/*****************************************************************************/
/* CommentsList: Lifecycle Hooks */
/*****************************************************************************/
Template.CommentsList.created = function () {
	commentLimit = new ReactiveVar(0);
	
};

Template.CommentsList.rendered = function () {
	
};

Template.CommentsList.destroyed = function () {
};
