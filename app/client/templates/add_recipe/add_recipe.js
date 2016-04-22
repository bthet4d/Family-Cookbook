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
		var type = $('#ingredient_type').val();
		var typeName = $('#ingredient_type').find(":selected").html();
		$('#ingredients_list').append(
			'<li data-id="ingredient" class="list-group-item clearfix">'
			+ '<span id="amount">' + amount + '</span>'
			+ ' '
			+ '<span id="type" val"' + type + '">' + typeName + '</span>'
			+ ' '
			+ '<span id="name">' + ingredient + '</span>'
			+ '</li>'
		);
		$('#ingredient_name').val('');
		$('#ingredient_amount').val('');
		//show ingrendients
		$('#ingredientsList').css('display: inline');
		//remove the invalid entry class
		$('#ingredient_name').removeClass('invalid-entry');
		$('#ingredient_amount').removeClass('invalid-entry');
		$('.sortable-ingredients').sortable('destroy');
		$('.sortable-ingredients').sortable();
	},

	'click [name=add_step]':function(e){
		e.preventDefault();
		//add step to the directions list

		var task = $("#directions_step").val();
		var newDirections = Template.instance().directions.get();

		var len = newDirections.push({'task': task});
		console.log('length');
		console.log(len);
		var index = 0;
		while(index < len){
			console.log('directions');
			console.log(newDirections[index]);
			newDirections[index]['stepCount'] = index + 1;
			index++;
		}
		//Template.instance().directions.set([]);
		console.log('new directions');
		console.log(newDirections);
		Template.instance().directions.set(newDirections);
		
		$("#directions_step").val('');
		//remove invalid entry class
		$('#directions_step').removeClass('invalid-entry');
		//increment step number
		Template.instance().step.set(Template.instance().step.get() + 1);
		$('.sortable-directions').sortable('destroy');
		$('.sortable-directions').sortable();

	},

	'click [name=submitRecipe]':function(e){
		e.preventDefault();
		var validForm = true;
		//submission by enter currently prevented
		if(e.keyCode == 13){
			validForm = false;
		}
		var title = $("#addTitle").val().toLowerCase();
		var prepTime = $("#addPrepTime").val();
		var servings = $("#addServings").val();
		var categoryId = $("#addCategoryId").val();
		var author = $('#addAuthor').val().toLowerCase();
		var stepPlain = 1;
		
		//if the title, author or category are emmpty, prevent submission
		if(title === ''){
			validForm = false;
			$('#addTitle').addClass('invalid-entry');
		}else{
			$('#addTitle').removeClass('invalid-entry');
		}
		if(author === ''){
			validForm = false;
			$('#addAuthor').addClass('invalid-entry');
		}else{
			$('#addAuthor').removeClass('invalid-entry');
		}

		if(categoryId === ''){
			validForm = false;
			$('#addCategoryId').addClass('invalid-entry');
		}else{
			$('#addCategoryId').removeClass('invalid-entry');
		}

		var directionsCount = document.getElementById('directionsTable').getElementsByTagName('tr').length;
		var ingredientsCount = document.getElementById('ingredients_list').getElementsByTagName('tr').length;
		
		if(!directionsCount){
			validForm = false;
			$("#directions_step").addClass('invalid-entry');
		}else{
			$("#directions_step").removeClass('invalid-entry');
		}

		if(!ingredientsCount){
			validForm = false;
			$('#ingredient_name').addClass('invalid-entry');
			$('#ingredient_amount').addClass('invalid-entry');
		}else{
			$('#ingredient_name').removeClass('invalid-entry');
			$('#ingredient_amount').removeClass('invalid-entry');
		}


		$('#directionsTable tr').each(function(){
			$(this).find('td').each(function(){
				if($(this).attr('id') === 'task'){
					directions.push({
						step: stepPlain,
						task: $(this).text().toLowerCase()
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
						name = $(this).context.innerHTML.toLowerCase();
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
		});
		//todo -add validation to form and disable submit on enter
	
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
			// ingredients not currently saved or used as a filter
			// moved to a search feature
			// for(ing in ingredients){
			// 	var ingToAdd = ingredients[ing].name;
			// 	//todo check if there are similar ingredients
			// 	var similarIngredients = Ingredients.find({name: new RegExp(ingToAdd)}).fetch();
			// 	Meteor.call('insertIngredient', ingToAdd);
			// }
		validForm = false;
			if(validForm){
				Meteor.call('addOriginalRecipe', recipe);
			}
			
	},

	'click [name="removeTask"]': function(e){

		//todo - reset the counts in the list....is this possible?????
		e.preventDefault();
		//remove the list item containing the span
		$(e.currentTarget).parent().remove();

		//todo also remove this from the reactive var

		var stepToRemove = e.currentTarget.dataset.step - 1;
		var currentDirections = Template.instance().directions.get();
		console.log(currentDirections);
		currentDirections.forEach(function(index, task){
			console.log(index);
			console.log(task);
			if(index === stepToRemove){
				currentDirections.splice(stepToRemove, 1);
			}
		});

	},
	'change [class="form-control invalid-entry"]': function(e){
		$(e.currentTarget).removeClass('invalid-entry');
	}
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
	},
	getMeasurements: function(){
		return MEASUREMENT_TYPES;
	},
	getMeasurementType: function(){
		return this.measurements;
	},
	clearList: function(){

		var directionsArray = Template.instance().directions.get();
		var directionsList = document.getElementById('directionsTable');


		if(directionsList){
			var listItems = directionsList.getElementsByTagName('li');
			if(listItems){
				//console.log('list items');
				//console.log(typeof listItems);
				for(var i = 0; i <= listItems.length; i++){
					//var li = listItems.item(i);
					//console.log('list item');
					//console.log(li);
					//console.log(i);
				}
			}
		}
	},
	getDirections: function(){
		var directionsArray = Template.instance().directions.get();
		//directionsArray.forEach(function(task, index){
        //
        //
		//	var currentStep = index + 1;
		//	$("#directionsTable").append(
        //
		//		'<li class="list-group-item clearfix">'
		//		+ '<span class="stepNumber">' + currentStep + '.</span>'
		//		+ task
		//		+ '<span name="removeTask" class="glyphicon glyphicon-minus" data-step="' + currentStep + '"><span>'
		//		+ '</li>'
		//		);
		//});
		return directionsArray;
	}, displayDirection: function(){
		//console.log(this);
	}
});

/*****************************************************************************/
/* AddRecipe: Lifecycle Hooks */
/*****************************************************************************/
Template.AddRecipe.created = function () {
	var instance = this;
	instance.directions = new ReactiveVar([]);
	instance.step = new ReactiveVar(1);
	instance.subscribe('ingredients');
};

Template.AddRecipe.rendered = function () {
};

Template.AddRecipe.destroyed = function () {
};
