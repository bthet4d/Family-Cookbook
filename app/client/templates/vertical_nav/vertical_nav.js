/*****************************************************************************/
/* VerticalNav: Event Handlers */
/*****************************************************************************/
Template.VerticalNav.events({
	'mouseover .sidebar-nav li': function(e){
		var target = e.currentTarget;
		var link = $(target).children('a');
		$(link).tooltip();
	},
	'click .vertical-navbar-component': function(e){
		if(e.currentTarget.id === 'popular'){
			//set session var
			Session.set('viewRecipes', {
			collection: 'popular',

		});
		}
	},
	'mouseover #categories': function(e){
		// $('#categoriesModal').modal('show');
	},
	'mouseleave #categories': function(e){
		// $('#categoriesModal').modal('hide');
	}
});

/*****************************************************************************/
/* VerticalNav: Helpers */
/*****************************************************************************/
Template.VerticalNav.helpers({
});

/*****************************************************************************/
/* VerticalNav: Lifecycle Hooks */
/*****************************************************************************/
Template.VerticalNav.created = function () {
};

Template.VerticalNav.rendered = function () {
};

Template.VerticalNav.destroyed = function () {
};
