/*****************************************************************************/
/* Browse: Event Handlers */
/*****************************************************************************/
Template.Browse.events({
		'click .ingredient': function(){
		//todo, set all elements in the reactive filter to active
		var element = $(document.getElementById(this._id));
		if(element.hasClass('active')){
			element.removeClass('active');
			var index = filteredIngredients.indexOf(this.name);
			filteredIngredients.splice(index, 1);
		}else{
			$(element).addClass('active');
			filteredIngredients.push(this.name);
		}
		
		Template.instance().reactiveFilter.set(filteredIngredients);
		Session.set('viewRecipes', {
			collection: 'byIngredient',
			ingredients: Template.instance().reactiveFilter.get()
		});
	},
	'click .category': function(){
		Template.instance().reactiveCategory.set(this);
		
		Session.set('viewRecipes', {
			collection: 'byCategory',
			category: this.catId,
			name: this.name
		});
		
		//set all ingredients to inactive
		resetIngredients();
		
		
		Template.instance().reactiveFilter.set([]);
	},
	'click .tabHeader': function(e){
		//active tab currently unused, but may be later
		var id = e.currentTarget.id;
		Template.instance().activeTab.set(id);
		Session.set('viewRecipes', {
			collection: 'all'
		});
		resetIngredients();
		
	}
});

/*****************************************************************************/
/* Browse: Helpers */
/*****************************************************************************/
Template.Browse.helpers({
	categories: function(){
		return Categories.find();
	},
	ingredients: function(){
		return Ingredients.find();
	},
});

/*****************************************************************************/
/* Browse: Lifecycle Hooks */
/*****************************************************************************/
Template.Browse.created = function () {
	resetIngredients = function(){
		$('.ingredient').each(function(){
		$(this).removeClass('active');
		});
		filteredIngredients = [];
	}
	var instance = this;
	instance.reactiveFilter = new ReactiveVar([]);
	instance.reactiveCategory = new ReactiveVar();
	instance.activeTab = new ReactiveVar('category');
};

Template.Browse.rendered = function () {
	filteredIngredients = [];
};

Template.Browse.destroyed = function () {
};
