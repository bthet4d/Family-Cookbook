/*****************************************************************************/
/* AddRecipe: Event Handlers */
/*****************************************************************************/
ingredients = [];
directions = [];
stepCounter = [];

Template.AddRecipe.events({
	'click [name=add_ingredient]':function(e){
		e.preventDefault();
		var ingredient = $('#ingredient_name').val();
		var amount = $('#ingredient_amount').val();
		$('#ingredients_list').append(
			'<tr>'
			+ '<td id="ingredient">' 
			+ '<span id="amount">' + amount + '</span>'
			+ ' '
			+ '<span id="name">' + ingredient + '</span>'
			+ '</td>'
			+ '</tr>'
		);
		$('#ingredient_name').val('');
		$('#ingredient_amount').val('');
		//show ingrendients
		$('#ingredientsList').css('display: inline');
		// ing = {
		// 	name: name,
		// 	amount: amount,
			
		// }
		// ingredients.push(ing);
		// console.log(ingredients);
	},

	'click [name=add_step]':function(e){
		e.preventDefault();
		//add step to the directions list
		
		var currentStep = Template.instance().step.get();
		var task = $("#directions_step").val();
		
		$("#directionsTable").append(
			'<tr class="step">' 
			+ '<td id="task">' + task + '</td>'
			// + '<td id="removeButton"><button class="removeTask" data-step="' + currentStep + '">-</button></td>'
			+ '<td id="removeButton"><span class="glyphicon glyphicon-minus" data-step="' + currentStep + '"></span></td>'

			+ '</tr>'
			);
		
		$("#directions_step").val('');
		//increment step number
		Template.instance().step.set(Template.instance().step.get() + 1);
	},

	'click [name=submitRecipe]':function(e){
		e.preventDefault();
		var title = $("#addTitle").val();
		var prepTime = $("#addPrepTime").val();
		var servings = $("#addServings").val();
		var categoryId = $("#addCategoryId").val();
		var author = $('#addAuthor').val();
		var stepPlain = 1;
		$('#directionsTable tr').each(function(){
			$(this).find('td').each(function(){
				if($(this).attr('id') === 'task'){
					directions.push({
						step: stepPlain,
						task: $(this).text()
					});
				}
			});
			stepPlain++;
		});

		$('#ingredients_list tr').each(function(){

			var name = '';
			var type = '';
			var amount = '';
			$(this).find('td').each(function(){
				$(this).find('span').each(function(){
					var id = (this).getAttribute('id');
					if(id === 'name'){
						name = $(this).context.innerHTML;
					}else if(id === 'amount'){
						amount = $(this).context.innerHTML;
					}
				});
			});
			var ing = {
				name: name,
				amount: amount
			}
			ingredients.push(ing);
	
			
			//search by ingredient, multiple/or relationship
			//Recipes.find({ingredients: {$elemMatch: {name: {$in: ['Ground turkey', 'turkey bacon']}}}}).fetch();
		});

		// if(false
		// 	categoryId === '' 
		// 	|| title === '' 
		// 	|| prepTime === '' 
		// 	|| servings === '' 
		// 	|| directions.length === 0 
		// 	|| ingredients.length === 0
		// ){
		if(false){
			alert('You missed a field');
		
		}else{
			// insert into Recipes Collection
			var recipe = {
				categoryId: parseInt(categoryId),
				title: title,
				author: author,
				prepTime: prepTime,
				servings: servings,
				directions: directions,
				ingredients: ingredients
			};
			// todo - loop over incredients array and push each to an ingredients collection
			//
			for(ing in ingredients){
				var ingToAdd = ingredients[ing].name;
				//todo check if there are similar ingredients
				var similarIngredients = Ingredients.find({name: '/' + ingToAdd + '/'}).fetch();
				Meteor.call('insertIngredient', ingToAdd);
			}

			// Meteor.call('addOriginalRecipe', recipe);
		}
	},

	'click [class="removeTask"]': function(e){
		//todo - reset the counts in the list....is this possible?????
		e.preventDefault();
		$(e.currentTarget).parent().parent().remove();
	},
});

/*****************************************************************************/
/* AddRecipe: Helpers */
/*****************************************************************************/
Template.AddRecipe.helpers({
	stepNumber: function(){

		return Template.instance().step.get();
	},
	category: function(){
		return Categories.find();
	},
	displayCategory: function(){
		if(this.catId !== 1){
			return true;
		}else{
			return false;
		}
	}
});

/*****************************************************************************/
/* AddRecipe: Lifecycle Hooks */
/*****************************************************************************/
Template.AddRecipe.created = function () {
	var instance = this;
	instance.step = new ReactiveVar(1);
};

Template.AddRecipe.rendered = function () {
};

Template.AddRecipe.destroyed = function () {
};
